import { NextResponse } from 'next/server';

import { authorization } from '@/middleware';
import { ResponseData } from '@/types';
import { dbConnect } from '@/utils/db';
import { Order } from '@/libs/schema';

const response = (data: ResponseData, status: number) => NextResponse.json(data, { status });

const GET = authorization(async (request, ctx, user) => {
  const { orderId } = await ctx.params as { orderId?: string };
  
  if (!orderId) return response({
    message: 'Order ID is required',
    success: false,
    data: null
  }, 400);

  try {
    await dbConnect();
    const order = await Order.findOne({ _id: orderId.toString() });

    return response({
      message: 'Order retrieved!',
      success: true,
      data: order
    }, 200);
  } catch (error) {
    console.error('Server Error', error);
    
    return response({
      message: 'Server Error',
      success: false,
      data: {}
    }, 500);
  }
});

export { GET };