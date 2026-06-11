import { Conversation, Message } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';
import { Document } from 'mongodb';

const POST = authorization(async (req, ctx, user) => {
  try {
    const { customerId, orderId, type } = await req.json();
    await dbConnect();
    
    if (type === 'support' && !customerId && user.role !== 'customer') return NextResponse.json({
      message: 'customerId required',
      code: 'missing_customer_id',
      success: false,
      data: null
    }, { status: 400 });
    
    if (type === 'order' && !orderId) return NextResponse.json({
      message: 'orderId required for order conversations',
      code: 'missing_order_id',
      success: false,
      data: null
    }, { status: 400 });
    
    const isStaff = ['admin', 'moderator'].includes(user.role);
    const customer = isStaff ? customerId : user.id;
    const agentOrAdmin = isStaff ? user.id : null;
    
    const participantRole = (userId: string) => {
      if (userId === agentOrAdmin?.toString()) {
        return user.role === 'admin' ? 'admin' : 'moderator';
      }
      
      return 'customer';
    };
    
    const participantIds = [customer, agentOrAdmin].filter(Boolean);
    
    const participants = participantIds.map((userId) => ({
      role: participantRole(userId.toString()),
      last_read: null,
      user: userId
    }));
    
    const existing = orderId ? await Conversation.findOne({ order: orderId }) : null;

    if (existing) return NextResponse.json({
      message: 'Conversation retrieved successfully',
      code: 'conversation_retrieved',
      data: existing,
      success: true
    });
    
    const conversation = await Conversation.create({
      order: orderId,
      participants,
      active: true,
      type
    });
    
    return NextResponse.json({
      message: 'Conversation created successfully',
      code: 'conversation_created',
      data: conversation,
      success: true
    }, { status: 201 });
  } catch (error) {
    console.error('Server error --> ', error);
    
    return NextResponse.json({
      message: 'Server error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});

const GET = authorization(async (req, ctx, user) => {
  try {
    await dbConnect();
    
    const conversations = await Conversation.find({ 'participants.user': user.id, active: true })
    .sort({ updatedAt: -1 })
    .populate('participants.user', 'name email role')
    .populate('order', 'reference status plan.name');
    
    const withUnread = await Promise.all(conversations.map(async (conversation) => {
      const participant = conversation.participants.find((participant: Document) => participant.user.id === user.id);
      const lastRead = participant?.last_read ?? new Date(0);
      const unread = await Message.countDocuments({
        'sender.user': { $ne: user.id },
        conversation: conversation.id,
        createdAt: { $gt: lastRead },
        is_deleted: false
      });
      
      return { ...conversation.toJSON(), unread };
    }));
    
    return NextResponse.json({
      message: 'Conversations retrieved successfully',
      code: 'conversations_retrieved',
      data: withUnread,
      success: true
    });
  } catch (error) {
    console.error('Server error --> ', error);
    
    return NextResponse.json({
      message: 'Server error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});

export { POST, GET };