import { NextRequest } from 'next/server';
import crypto from 'crypto';

import { sendWelcomeEmail } from '@/utils/mailers';
import { verifyToken } from '@/utils/tokens';
import { db } from '@/utils/db';

const POST = async (request: NextRequest) => {
  const payload = await request.json();
  
  if (!payload.token) return Response.json({
    message: 'Verification token is missing.',
    code: 'missing_token',
    success: false,
    data: null
  }, { status: 400 });

  const token = await verifyToken(payload.token);
  
  if (!token) return Response.json({
    message: 'Verification link has expired or is invalid. Please request a new one.',
    code: 'invalid_token',
    success: false,
    data: null
  }, { status: 401 });
  
  try {
    const hashedToken = crypto.createHash('sha256').update(payload.token).digest('hex');
    const tokens = db.collection('tokens');
    const users = db.collection('users');

    const userToken = await tokens.findOne({
      purpose: 'email-verification',
      token: hashedToken
    });

    if (!userToken) return Response.json({
      message: 'Invalid or expired token',
      code: 'invalid_token',
      success: false,
      data: null
    }, { status: 401 });

    // If token has expired, delete from record.
    if (new Date() > new Date(userToken.expiresAt)) {
      await tokens.deleteOne({ _id: userToken._id });

      return Response.json({
        message: 'Verification link has expired. Please request a new one.',
        code: 'token_expired',
        success: false,
        data: null
      }, { status: 401 });
    }

    await tokens.deleteOne({ _id: userToken._id });

    await users.updateOne({ email: userToken.email }, {
      $set: {
        verified_at: new Date(),
        is_verified: true
      }
    });
    
    sendWelcomeEmail(request, {
      email: userToken.email,
      name: userToken.name
    });

    return Response.json({
      message: 'Account verified successfully',
      code: 'account_verified',
      success: true,
      data: null
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
};

export { POST };