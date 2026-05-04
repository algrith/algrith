import { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { sendWelcomeEmail } from '@/utils/mailers';
import { generateTokens } from '@/utils/tokens';
import { db } from '@/utils/db';

const RegisterSchema = z.object({
  password: z.string().min(8).max(100),
  email: z.string().email()
});

const googleLogin = async (request: NextRequest, token: string) => {
  const decoded = decodeGoogleToken(token);
  if (decoded instanceof Response) return decoded;
  const { email, name, sub: google_id } = decoded;

  if (!email) return Response.json({
    message: 'Google token missing email!',
    code: 'invalid_token',
    success: false,
    data: null
  }, { status: 401 });
  
  const users = db.collection('users');
  let user = await users.findOne({ email });

  if (user && user.auth_method !== 'google') return Response.json({
    message: 'An account with this email already exists. Please login with your password.',
    code: 'conflicting_provider',
    success: false,
    data: null
  }, { status: 409 });

  if (!user) {
    const result = await users.insertOne({
      auth_method: 'google',
      is_verified: true,
      google_id,
      email,
      name
    });

    user = await users.findOne({ _id: result.insertedId });
    
    sendWelcomeEmail(request, {
      email: user?.email,
      name: user?.name
    });
  }

  const tokens = await generateTokens({ id: user?._id });

  return Response.json({
    message: 'Authentication successful!',
    code: 'signin_successful',
    success: true,
    data: {
      token: tokens,
      user: {
        email: user?.email,
        name: user?.name,
        id: user?._id
      }
    }
  });
};

const credentialsLogin = async (payload: object) => {
  const parsed = RegisterSchema.safeParse(payload);
  
  if (!parsed.success) return Response.json({
    data: parsed.error.flatten(),
    code: 'invalid_credentials',
    message: 'Invalid input',
    success: false,
  }, { status: 400 });
  
  const { password, email } = parsed.data;
  const users = db.collection('users');

  const user = await users.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, (user?.password ?? ''));

  if (!user || !isPasswordValid) return Response.json({
    message: 'Invalid email or password!',
    code: 'invalid_credentials',
    success: false,
    data: null
  }, { status: 401 });

  if (!user.is_verified) return Response.json({
    message: 'Account not verified!',
    code: 'email_not_verified',
    success: false,
    data: null
  }, { status: 401 });

  const tokens = await generateTokens({ id: user._id });

  return Response.json({
    message: 'Authentication successful!',
    code: 'signin_successful',
    success: true,
    data: {
      token: tokens,
      user: {
        email: user.email,
        name: user.name,
        id: user._id
      }
    }
  });
};

const decodeGoogleToken = (token: string) => {
  let googlePayload;

  try {
    googlePayload = decodeJwt(token);
  } catch {
    return Response.json({
      message: 'Invalid Google token!',
      code: 'invalid_token',
      success: false,
      data: null
    }, { status: 401 });
  }

  return googlePayload;
};

const POST = async (request: NextRequest) => {
  const payload = await request.json();

  try {
    if (payload.token) return await googleLogin(request, payload.token);
    return await credentialsLogin(payload);
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