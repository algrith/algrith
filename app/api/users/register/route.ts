import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';

import { sendVerificationEmail } from '@/utils/mailers';
import { generateTokens } from '@/utils/tokens';
import { AuthState } from '@/types';
import { client } from '@/utils/db';

const RegisterSchema = z.object({
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100),
  email: z.string().email()
});

const registerUser = async (user: Partial<AuthState['model']>) => {
  const hashedPassword = await bcrypt.hash(user.password as string, 12);
  const database = client.db('algrith');
  const tokens = database.collection('tokens');
  const users = database.collection('users');

  const existingUser = await users.findOne({ email: user.email });
  if (existingUser) throw new Error('EMAIL_EXISTS');
  
  const { insertedId } = await users.insertOne({
    ...user,
    password: hashedPassword,
    auth_method: 'email',
    is_verified: false
  });

  const { access_token } = await generateTokens({ id: insertedId });
  const hashedToken = crypto.createHash('sha256').update(access_token).digest('hex');
  
  await tokens.insertOne({
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    purpose: 'email-verification',
    token: hashedToken,
    email: user.email,
    name: user.name
  });

  console.log(`User registration successful --> ${insertedId}`);

  return access_token;
};

const POST = async (request: NextRequest) => {
  try {
    const parsed = RegisterSchema.safeParse(await request.json());
    const { success, error, data } = parsed;

    if (!success) return Response.json({
      message: 'Invalid input',
      code: 'invalid_input',
      data: error.flatten(),
      success: false
    }, { status: 400 });

    const token = await registerUser(data);
    
    sendVerificationEmail(request, {
      ...data,
      token,
    });

    return Response.json({
      message: 'Sign up successful! A verification email has been sent to you inbox.',
      code: 'signup_successful',
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Server Error', error);

    if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
      return Response.json({
        message: 'An account with this email already exists.',
        code: 'account_already_exists',
        success: false,
        data: null
      }, { status: 409 });
    }
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: {}
    }, { status: 500 });
  }
};

export { POST };