import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { Order } from '@/libs/schema';

const GET = authorization(async (request, ctx, user) => {
  const { orderId } = await ctx.params as { orderId?: string };
  
  if (!orderId) return Response.json({
    message: 'Order ID is required',
    code: 'order_id_required',
    success: false,
    data: null
  }, { status: 400 });

  try {
    await dbConnect();
    const order = await Order.findOne({ _id: orderId.toString() });

    return Response.json({
      message: 'Order retrieved!',
      code: 'order_retrieved',
      success: true,
      data: order
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