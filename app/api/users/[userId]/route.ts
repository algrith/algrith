import { authorization } from '@/middleware';
import { Order, User } from '@/libs/schema';
import { dbConnect } from '@/utils/db';

const DELETE = authorization(async (request, ctx, user) => {
  try {
    const { userId } = await ctx.params as { userId: string };
    const isAdmin = user.role === 'admin';
  
    if (!userId) return Response.json({
      message: 'Order ID is required',
      code: 'order_id_required',
      success: false,
      data: null
    }, { status: 400 });
    
    if (!isAdmin && userId !== user.id) return Response.json({
      message: 'Operation forbidden',
      code: 'unauthorized',
      success: false,
      data: null
    }, { status: 403 });
    
    await dbConnect();
    await User.deleteOne({ _id: userId });

    return Response.json({
      message: 'User deleted successfully',
      code: 'user_deleted',
      success: true,
      data: null
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});

const GET = authorization(async (request, ctx, user) => {
  try {
    const params = (await ctx.params) as { userId: string };
    const { userId } = params;

    if (!userId) return Response.json({
      message: 'User ID missing',
      code: 'missing_user_id',
      success: false,
      data: null
    }, { status: 400 });

    await dbConnect();

    const orders_count = await Order.find({ user: userId }).countDocuments();
    const account = await User.findOne({ _id: userId });

    return Response.json({
      message: 'User retrieved successfully',
      code: 'user_retrieved',
      success: true,
      data: {
        ...account.toJSON(),
        orders_count
      }
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});

export { DELETE, GET };