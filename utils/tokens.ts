import { jwtVerify, SignJWT } from 'jose';

export const generateTokens = async (payload: object) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const access_token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .setIssuedAt()
    .sign(secret);

  const refresh_token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(secret);

  return { access_token, refresh_token };
};

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return token;
  } catch (error) {
    console.error('Invalid token');
    return undefined;
  }
};