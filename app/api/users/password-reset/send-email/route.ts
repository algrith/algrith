import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';

import { sendPasswordResetEmail } from '@/utils/mailers';
import { generateTokens } from '@/utils/tokens';
import { User } from 'next-auth';
import { db } from '@/utils/db';

const PasswordResetEmailSchema = z.object({
  email: z.string().email()
});

const createPasswordResetToken = async (user: Partial<User>) => {
  const tokens = db.collection('tokens');

  const { access_token } = await generateTokens({ email: user.email });
  const hashedToken = crypto.createHash('sha256').update(access_token).digest('hex');
  
  await tokens.insertOne({
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    purpose: 'password-reset',
    token: hashedToken,
    email: user.email,
    name: user.name
  });

  console.log(`Password reset token created for --> ${user.id}`);

  return access_token;
};

const POST = async (request: NextRequest) => {
  try {
    const parsed = PasswordResetEmailSchema.safeParse(await request.json());
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
      message: 'Password reset link has been sent.',
      code: 'password_reset_email_sent',
      success: true,
      data: null,
    });

    const token = await createPasswordResetToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    });
    
    sendPasswordResetEmail(request, {
      email: user.email,
      name: user.name,
      token
    });

    return Response.json({
      message: 'Password reset email has been sent.',
      code: 'password_reset_email_sent',
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