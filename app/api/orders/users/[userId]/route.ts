import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { Order } from '@/libs/schema';

const GET = authorization(async (request, ctx, user) => {
  const { userId } = await ctx.params as { userId?: string };
  const { role, id } = user;
  
  const isAdmin = role === 'admin';

  if (!isAdmin && userId !== id) return Response.json({
    message: 'Permission denied',
    code: 'permission_denied',
    success: false,
    data: null
  }, { status: 401 });

  try {
    await dbConnect();
    const orders = await Order.find({ user: userId });

    return Response.json({
      message: 'User orders retrieved!',
      code: 'user_order_retrieved',
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: {}
    }, { status: 500 });
  }
});

export { GET };