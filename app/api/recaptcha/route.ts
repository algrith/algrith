import { NextRequest } from 'next/server';

const POST = async (req: NextRequest) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const data = await req.json();
  const { token } = data;
  
  if (!token) return Response.json({
    message: 'Token Not Found',
    success: false,
    data
  }, { status: 405 });

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    const success = data.score > 0.7;

    if (!data.success) return Response.json({
      message: 'Token Verification Failed',
      success: false,
      data
    }, { status: 405 });
    
    const message = success ? 'Token Verified' : 'Verification Failed';
    const code = success ? 200 : 405;

    return Response.json({
      message,
      success,
      data
    }, { status: code });
  } catch (error) {
    console.error('Server Error', error);

    return Response.json({
      message: 'Internal Server Error',
      success: false,
      data
    }, { status: 500 });
  }
};

export { POST };