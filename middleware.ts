import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@daveyplate/next-rate-limit';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return await rateLimit({ request, response });
};

export const inProtectedRoute = (pathname: string) => config.matcher.some((pattern = '') => {
  const regex = new RegExp(`^${pattern.replace(/:([a-zA-Z_]+)/g, '[^/]+')}$`);
  return regex.test(pathname);
});

export const config = {
  matcher: []
};