import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { User } from '@/libs/schema';

const DELETE = authorization(async (request, ctx, user) => {
  try {
    const params = (await ctx.params) as { userId: string };
    const { userId } = params;

    await dbConnect();
    await User.deleteOne({ _id: userId });

    return Response.json({
      message: 'User deleted successfully',
      code: 'deleted_successfully',
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

    await dbConnect();
    const account = await User.findOne({ _id: userId });
    
    return Response.json({
      message: 'User retrieved successfully',
      code: 'retrieved_successfully',
      success: true,
      data: account
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