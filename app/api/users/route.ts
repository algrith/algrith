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
  if (user.role !== 'admin') return Response.json({
    message: 'Permission denied',
    code: 'permission_denied',
    success: true,
    data: null
  });

  try {
    await dbConnect();
    
    const users = await User.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          foreignField: 'user',
          localField: '_id',
          from: 'orders',
          as: 'orders',
          pipeline: [
            { $project: { _id: 1 } }
          ]
        }
      },
      {
        $addFields: {
          orders_count: { $size: '$orders' },
          id: { $toString: '$_id' }
        }
      },
      {
        $project: {
          password: 0,
          orders: 0,
          _id: 0
        }
      }
    ]);
    
    return Response.json({
      message: 'Users retrieved successfully',
      code: 'users_retrieved_successfully',
      success: true,
      data: users
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