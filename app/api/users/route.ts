import { fetchUsers } from '@/utils/server/controllers';
import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';

const GET = authorization(async (request, ctx, user) => {
  if (user.role !== 'admin') return Response.json({
    message: 'Permission denied',
    code: 'permission_denied',
    success: true,
    data: null
  });

  try {
    const params = request.nextUrl.searchParams;
    const limit = Number(params.get('limit')) || 50;
    const page = Number(params.get('page')) || 1;
    await dbConnect();
    
    const data = await fetchUsers({ limit, page });

    return Response.json({
      message: 'Users retrieved successfully',
      code: 'users_retrieved',
      success: true,
      data
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

export { GET };