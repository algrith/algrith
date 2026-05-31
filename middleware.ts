import { AppRouteHandlerRoutes } from './.next/types/routes';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@daveyplate/next-rate-limit';

import { verifyToken } from './utils/tokens';
import { auth } from '@/libs/auth';
import { User } from 'next-auth';

export const authorization = (handler: (req: NextRequest, ctx: RouteContext<AppRouteHandlerRoutes>, user: User) => Promise<NextResponse>) => {
  return async (req: NextRequest, ctx: RouteContext<AppRouteHandlerRoutes>): Promise<NextResponse> => {
    try {
      const token = req.headers.get('authorization')?.split(' ')[1];

      if (!token) return NextResponse.json({
        message: 'Unauthorized operation',
        code: 'invalid_token',
        success: false,
        data: null
      }, { status: 401 });

      const decoded = await verifyToken(token);
      
      const { user } = await auth() || {};

      if (!user) return NextResponse.json({
        message: 'Unauthorized operation',
        code: 'invalid_token',
        success: false,
        data: null
      }, { status: 403 });

      return handler(req, ctx, user);
    } catch (error) {
      console.error('Unauthorized operation --> ', error);
      
      return NextResponse.json({
        message: 'Invalid or expired token',
        code: 'invalid_token',
        success: false,
        data: null
      }, { status: 401 });
    }
  };
};

export const inProtectedRoute = (pathname: string) => config.matcher.some((pattern = '') => {
  const regex = new RegExp(`^${pattern.replace(/:([a-zA-Z_]+)/g, '[^/]+')}$`);
  return regex.test(pathname);
});

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  return await rateLimit({
    response,
    request
  });
};

export const config = {
  matcher: [
    '/dashboard/orders/:orderId',
    '/dashboard/orders',
    '/dashboard'
  ]
};