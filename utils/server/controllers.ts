import { Conversation as ConversationModel, Message as MessageModel } from '@/types';
import { Message, Conversation, Order } from '@/libs/schema';
import { NextResponse } from 'next/server';
import { getSocket } from '@/libs/socket';
import { User } from 'next-auth';

export const createConversation = async (user: User, customerId: string, message: MessageModel, orderId: string) => {
  const userRole = user.role || 'customer';
  const type = message?.type || 'order';
  
  if (type === 'support' && !customerId && userRole !== 'customer') return NextResponse.json({
    message: 'customerId required',
    code: 'missing_customer_id',
    success: false,
    data: null
  }, { status: 400 });

  if (!message?.attachments && !message?.text) return NextResponse.json({
    message: 'Cannot create an empty conversation',
    code: 'missing_message_data',
    success: false,
    data: null
  }, { status: 400 });
  
  if (type === 'order' && !orderId) return NextResponse.json({
    message: 'orderId required for order conversations',
    code: 'missing_order_id',
    success: false,
    data: null
  }, { status: 400 });
  
  const isStaff = ['admin', 'moderator'].includes(userRole);
  const customer = isStaff ? customerId : user.id;
  const agentOrAdmin = isStaff ? user.id : null;
  
  const participantRole = (userId?: string | null) => {
    if (userId === agentOrAdmin?.toString()) {
      return userRole === 'admin' ? 'admin' : 'moderator';
    }
    
    return 'customer';
  };
  
  const participantIds = [customer, agentOrAdmin].filter(Boolean);
  
  const participants = participantIds.map((userId) => ({
    role: participantRole(userId),
    last_read: null,
    user: userId
  }));
  
  let conversation = orderId ? await Conversation.findOne({ order: orderId }) : null;
  
  if (!conversation) {
    conversation = await Conversation.create({
      order: orderId,
      participants,
      active: true,
      type
    });

    // Attach conversation to order.
    const order = await Order.updateOne({ _id: orderId }, {
      conversation: conversation.id
    });
  }

  return conversation as ConversationModel;
};

export const createMessage = async (user: User, conversationId: string, payload: MessageModel) => {
  const { text = '', attachments = [], type = 'order', temp_id } = payload;
  const senderRole = user.role || 'customer';
  
  if (!text?.trim() && !attachments.length) return NextResponse.json({
    message: 'Text or attachment is required',
    code: 'empty_message',
    success: false,
    data: null
  }, { status: 400 });
  
  const conversation = await Conversation.findOne({
    'participants.user': user.id,
    _id: conversationId,
    active: true
  });
  
  if (!conversation) return NextResponse.json({
    message: 'Conversation not found',
    code: 'conversation_not_found',
    success: false,
    data: null
  }, { status: 404 });

  const message = await Message.create({
    sender: { role: senderRole, user: user.id },
    metadata: {...(payload.metadata || {})},
    conversation: conversationId,
    attachments,
    text,
    type
  });
  
  await Conversation.updateOne({ _id: conversationId }, {
    last_message: {
      text: text || '📎 Attachment',
      createdAt: message.createdAt,
      _id: message.id,
      sender: user.id
    }
  });
  
  const populated = await message.populate('sender.user', 'name email role');
  const socket = getSocket();
  socket?.to(conversation.id).emit('message:new', populated);

  return { ...populated.toJSON(), temp_id } as MessageModel;
};