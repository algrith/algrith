import { AppRouteHandlerRoutes } from './.next/types/routes';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@daveyplate/next-rate-limit';

import { verifyToken } from './utils/tokens';
import { auth } from '@/libs/auth';
import { User } from 'next-auth';

export const authorization = (handler: (req: NextRequest, ctx: RouteContext<AppRouteHandlerRoutes>, user: User) => Promise<Response>) => {
  return async (req: NextRequest, ctx: RouteContext<AppRouteHandlerRoutes>): Promise<Response> => {
    try {
      const token = req.headers.get('authorization')?.split(' ')[1];

      if (!token) return Response.json({
        message: 'Unauthorized operation',
        code: 'invalid_token',
        success: false,
        data: null
      }, { status: 401 });

      const decoded = await verifyToken(token);
      
      const { user } = await auth() || {};

      if (!user) return Response.json({
        message: 'Unauthorized operation',
        code: 'invalid_token',
        success: false,
        data: null
      }, { status: 403 });

      return handler(req, ctx, user);
    } catch (error) {
      console.error('Unauthorized operation --> ', error);
      
      return Response.json({
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
  // const userAgent = request.headers.get('user-agent') ?? '';
  const response = NextResponse.next();
  
  // if (config.blockedUserAgents.some((pattern) => pattern.test(userAgent))) {
  //   return new NextResponse('Forbidden', { status: 403 });
  // }

  return await rateLimit({
    response,
    request
  });
};

export const config = {
  // blockedUserAgents: [
  //   /sppb-rce-poc/i,
  //   /masscan/i,
  //   /sqlmap/i,
  //   /zgrab/i,
  //   /nikto/i
  // ],
  matcher: [
    '/dashboard/orders/:orderId',
    '/dashboard/users/:userId',
    '/dashboard/account',
    '/dashboard/orders',
    '/dashboard/users',
    '/dashboard'
  ]
};