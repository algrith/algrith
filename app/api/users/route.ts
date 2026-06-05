import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { User } from '@/libs/schema';

const DELETE = authorization(async (request, ctx, user) => {
  try {
    await dbConnect();
    await User.deleteOne({ _id: user.id });

    return Response.json({
      message: 'Account deleted successfully',
      code: 'account_deleted_successfully',
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
    await dbConnect();
    const profile = await User.findOne({ _id: user.id });
    
    return Response.json({
      message: 'Profile retrieved successfully',
      code: 'retrieved_successfully',
      success: true,
      data: profile
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