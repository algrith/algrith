import { Conversation as ConversationModel, Message as MessageModel } from '@/types';
import { Message, Conversation, Order, User as UserModel } from '@/libs/schema';
import { socketEmitter } from '@/utils/socket';
import { NextResponse } from 'next/server';
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
  
  let conversation = orderId ? await Conversation.findOne({ order: orderId }) : null;
  
  if (!conversation) {
    let participants = [];

    if (type === 'order') {
      const order = await Order.findOne({ _id: orderId });
      const participantIds = [...order.assignees, order.user];
      
      for (const participantId of participantIds) {
        const participant = await UserModel.findOne({ _id: participantId });
        
        participants.push({
          role: participant.role,
          user: participant.id,
          last_read: null
        });
      }
    } else {
      const admin = await UserModel.findOne({ role: 'admin' });
      
      participants = [
        { role: admin.role, user: admin.id, last_read: null },
        { role: user.role, user: user.id, last_read: null }
      ];
    }

    conversation = await Conversation.create({
      order: orderId,
      participants,
      active: true,
      type
    });
    
    // Attach conversation to order.
    await Order.updateOne({ _id: orderId }, {
      conversation: conversation.id
    });
  }

  conversation = await conversation.populate('order', 'reference status plan.name');
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
  
  const populated = (await message.populate('sender.user', 'name email role')).toJSON();
  socketEmitter('message:new', { user, conversation, message: populated });
  return { ...populated, temp_id } as MessageModel;
};

export const fetchOrders = async (user: User, { page = 1, limit = 50 } = {}) => {
  const isStaff = ['admin', 'moderator'].includes(user.role);
  const skip = (page - 1) * limit;
  const filter = isStaff ? (
    user.role === 'moderator' ? { assignees: user.id } : {}
  ) : {
    user: user.id
  };
  
  const [list, total] = await Promise.all([
    Order.find(filter).populate('assignees', 'id name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter)
  ]);

  return {
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
    limit,
    total,
    list,
    page
  };
};

export const fetchUsers = async ({ page = 1, limit = 50 } = {}) => {
  const skip = (page - 1) * limit;
  
  const [result] = await UserModel.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        pipeline: [{ $project: { _id: 1 } }],
        foreignField: 'user',
        localField: '_id',
        from: 'orders',
        as: 'orders'
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
    },
    {
      $facet: {
        list: [{ $skip: skip }, { $limit: limit }],
        meta: [{ $count: 'total' }]
      }
    }
  ]);

  const total = result.meta[0]?.total ?? 0;

  return {
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
    list: result.list,
    total,
    limit,
    page
  };
};