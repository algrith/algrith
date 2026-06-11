import { Order, Message, Conversation } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';
import { getSocket } from '@/libs/socket';

const PATCH = authorization(async (req, ctx, user) => {
  try {
    const { orderId } = await ctx.params as { orderId?: string };
    const { status } = await req.json();
    await dbConnect();
    
    const validStatuses = ['pending', 'completed', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) return NextResponse.json({
      message: 'Invalid order status',
      code: 'invalid_order_status',
      success: false,
      data: null
    }, { status: 400 });

    const order = await Order.findByIdAndUpdate(orderId, {
      status
    }, { new: true });

    if (!order) return NextResponse.json({
      message: 'Order not found',
      code: 'order_not_found',
      success: false,
      data: null
    }, { status: 404 });
    
    const conversation = await Conversation.findOne({ order: orderId });

    if (conversation) {
      const senderRole = user.role === 'admin' ? 'admin' : 'moderator';
      const text = `Order marked as ${status} by ${user.email}.`;
      
      const message = await Message.create({
        sender: { user: user.id, role: senderRole },
        metadata: { order_status: status },
        conversation: conversation._id,
        type: 'order',
        text
      });
      
      await Conversation.updateOne({ _id: conversation._id }, {
        last_message: {
          createdAt: message.createdAt,
          _id: message._id,
          sender: user.id,
          text
        }
      });

      const socket = getSocket();
      socket?.to(conversation.id).emit('message:new', message);
      socket?.to(conversation.id).emit('order:updated', {
        orderId,
        status
      });
    }

    return NextResponse.json({
      message: 'Order updated successfully',
      code: 'order_updated',
      success: false,
      data: order
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