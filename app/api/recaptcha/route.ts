import { NextRequest } from 'next/server';

import { ResponseData } from '@/types';

const NextResponse = (data: ResponseData, status: number) => Response.json(data, { status });

const POST = async (req: NextRequest) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const data = await req.json();
  const { token } = data;
  
  if (!token) return NextResponse({
    message: 'Token Not Found',
    success: false,
    data
  }, 405);

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    const success = data.score > 0.7;

    if (!data.success) return NextResponse({
      message: 'Token Verification Failed',
      success: false,
      data
    }, 405);
    
    const message = success ? 'Token Verified' : 'Verification Failed';
    const code = success ? 200 : 405;

    return NextResponse({
      message,
      success,
      data
    }, code);
  } catch (error) {
    console.error('Server Error', error);

    return NextResponse({
      message: 'Internal Server Error',
      success: false,
      data
    }, 500);
  }
};

export { POST };