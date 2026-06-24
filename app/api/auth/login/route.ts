import { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { sendWelcomeEmail } from '@/utils/mailers';
import { generateTokens } from '@/utils/tokens';
import { dbConnect } from '@/utils/db';
import { User } from '@/libs/schema';

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

  let user = await User.findOne({ email });

  if (user && user.auth_provider !== 'google') return Response.json({
    message: 'An account with this email already exists. Please login with your password.',
    code: 'conflicting_provider',
    success: false,
    data: null
  }, { status: 409 });

  if (!user) {
    const newUser = await User.create({
      auth_provider: 'google',
      is_verified: true,
      google_id,
      email,
      name
    });

    user = await User.findOne({ _id: newUser.id });
    
    sendWelcomeEmail(request, {
      email: user?.email,
      name: user?.name
    });
  }

  const tokens = await generateTokens({
    role: user.role,
    name: user.name,
    id: user.id
  });

  return Response.json({
    message: 'Authentication successful!',
    code: 'signin_successful',
    success: true,
    data: {
      token: tokens,
      user: {
        auth_provider: user.auth_provider,
        email: user.email,
        role: user.role,
        name: user.name,
        id: user.id
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

  const user = await User.findOne({ email }).select('+password');
  ;
  
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

  const tokens = await generateTokens({
    role: user.role,
    name: user.name,
    id: user.id
  });

  return Response.json({
    message: 'Authentication successful!',
    code: 'signin_successful',
    success: true,
    data: {
      token: tokens,
      user: {
        auth_provider: user.auth_provider,
        email: user.email,
        role: user.role,
        name: user.name,
        id: user.id
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
    await dbConnect();
    return await (payload.token ? googleLogin(request, payload.token) : credentialsLogin(payload));
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