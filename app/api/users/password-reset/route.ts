import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';

import { verifyToken } from '@/utils/tokens';
import { db } from '@/utils/db';

const PasswordResetSchema = z.object({
  confirm_password: z.string().min(8).max(100),
  password: z.string().min(8).max(100),
  token: z.string()
});

const POST = async (request: NextRequest) => {
  try {
    const parsed = PasswordResetSchema.safeParse(await request.json());
    const { success, error, data } = parsed;

    if (!success) return Response.json({
      message: 'Invalid input',
      code: 'invalid_input',
      data: error.flatten(),
      success: false
    }, { status: 400 });

    const token = await verifyToken(data.token);
    
    if (!token) return Response.json({
      message: 'Verification link has expired or is invalid. Please request a new one.',
      code: 'invalid_token',
      success: false,
      data: null
    }, { status: 401 });
    
    if (data.password !== data.confirm_password) return Response.json({
      message: 'Passwords do not match',
      code: 'password_mismatch',
      success: false,
      data: null
    }, { status: 400 });

    const hashedToken = crypto.createHash('sha256').update(data.token).digest('hex');
    const tokens = db.collection('tokens');
    const users = db.collection('users');

    const userToken = await tokens.findOne({
      purpose: 'password-reset',
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
        message: 'Password reset link has expired. Please request a new one.',
        code: 'token_expired',
        success: false,
        data: null
      }, { status: 401 });
    }
    
    const user = await users.findOne({ email: userToken.email });
    
    if (!user) return Response.json({
      message: 'Account not found.',
      code: 'user_not_found',
      success: false,
      data: null
    }, { status: 404 });

    const hashedPassword = await bcrypt.hash(data.password as string, 12);

    await users.updateOne({ email: userToken.email }, {
      $set: { password: hashedPassword }
    });

    await tokens.deleteOne({ _id: userToken._id });

    return Response.json({
      message: 'Password reset successful.',
      code: 'password_reset_successful',
      success: true,
      data: null
    });
  } catch (error) {
    console.error('Server Error', error);

    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: {}
    }, { status: 500 });
  }
};

export { POST };