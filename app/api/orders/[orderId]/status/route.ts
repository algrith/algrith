import { createConversation, createMessage } from '@/utils/server/controllers';
import { Order, Conversation } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';

const PATCH = authorization(async (req, ctx, user) => {
  try {
    const validStatuses = ['pending', 'completed', 'delivered', 'cancelled'];
    const { message: messagePayload, status } = await req.json();
    const { orderId } = await ctx.params as { orderId: string };
    await dbConnect();

    if (!validStatuses.includes(status)) return NextResponse.json({
      message: 'Invalid order status',
      code: 'invalid_order_status',
      success: false,
      data: null
    }, { status: 400 });

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) return NextResponse.json({
      message: 'Order not found',
      code: 'order_not_found',
      success: false,
      data: null
    }, { status: 404 });
    
    let conversation = await Conversation.findOne({ order: orderId });

    if (!conversation) {
      conversation = await createConversation(user, order.user.toString(), messagePayload, orderId);
      if (conversation instanceof NextResponse) return conversation;
    }
    
    const order_status_info = messagePayload?.metadata?.order_status_info ?? `Order ${status} by ${user.email}.`;
    const text = messagePayload?.text ?? order_status_info;
    
    const message = await createMessage(user, conversation._id, {
      ...(messagePayload ?? {}),
      metadata: { order_status_info },
      text
    });

    if (message instanceof NextResponse) return message;

    return NextResponse.json({
      message: 'Order updated successfully',
      code: 'order_status_updated',
      success: true,
      data: {
        message,
        order
      }
    });
  } catch (error) {
    console.error('Server error --> ', error);
    
    return NextResponse.json({
      message: 'Server error',
      code: 'server_error',
      success: false,
      data: null
    });
  }
});

export { PATCH };