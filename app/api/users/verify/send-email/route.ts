import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';

import { sendVerificationEmail } from '@/utils/mailers';
import { generateTokens } from '@/utils/tokens';
import { User } from 'next-auth';
import { db } from '@/utils/db';

const EmailVerificationSchema = z.object({
  email: z.string().email()
});

const createEmailVerificationToken = async (user: Partial<User>) => {
  const tokens = db.collection('tokens');

  const { access_token } = await generateTokens({ email: user.email });
  const hashedToken = crypto.createHash('sha256').update(access_token).digest('hex');
  
  await tokens.insertOne({
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    purpose: 'email-verification',
    token: hashedToken,
    email: user.email,
    name: user.name
  });

  console.log(`Verification email sent --> ${user.id}`);

  return access_token;
};

const POST = async (request: NextRequest) => {
  try {
    const parsed = EmailVerificationSchema.safeParse(await request.json());
    const { success, error, data } = parsed;

    if (!success) return Response.json({
      message: 'Invalid input',
      code: 'invalid_input',
      data: error.flatten(),
      success: false
    }, { status: 400 });
    
    const users = db.collection('users');
    
    const user = await users.findOne({
      email: data.email
    });
    
    if (!user) return Response.json({
      message: `User doesn't exist`,
      code: 'user_not_found',
      success: false,
      data: null,
    }, { status: 404 });

    if (user.is_verified) return Response.json({
      message: `Account already verified`,
      code: 'account_already_verified',
      success: false,
      data: null,
    }, { status: 401 });

    const token = await createEmailVerificationToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    });
    
    sendVerificationEmail(request, {
      email: user.email,
      name: user.name,
      token
    });

    return Response.json({
      message: 'Verification email has been sent.',
      code: 'verification_resent',
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