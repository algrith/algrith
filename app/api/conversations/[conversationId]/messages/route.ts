import { Message, Conversation } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { getSocket } from '@/libs/socket';
import { dbConnect } from '@/utils/db';
import { Document } from 'mongodb';

const POST = authorization(async (req, ctx, user) => {
  try {
    const { text = '', attachments = [], type = 'message', temp_id } = await req.json();
    const { conversationId } = await ctx.params as { conversationId?: string };
    await dbConnect();
    
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
    
    const senderRole = conversation.participants.find((participant: Document) => (
      participant.user.id === user.id
    ))?.role ?? 'customer';
    
    const message = await Message.create({
      conversation: conversationId,
      attachments,
      text,
      type,
      sender: {
        role: senderRole,
        user: user.id
      }
    });
    
    await Conversation.updateOne({ _id: conversationId }, {
      last_message: {
        text: text ?? '📎 Attachment',
        createdAt: message.createdAt,
        _id: message.id,
        sender: user.id
      }
    });
    
    const populated = await message.populate('sender.user', 'name email role');
    const socket = getSocket();
    socket?.to(conversation.id).emit('message:new', populated);

    return NextResponse.json({
      message: 'Message created successfully',
      code: 'message_created',
      success: true,
      data: {
        ...populated.toJSON(),
        temp_id
      }
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
    const { conversationId } = await ctx.params as { conversationId?: string };
    await dbConnect();

    const conversation = await Conversation.findOne({
      'participants.user': user.id,
      _id: conversationId
    });
    
    if (!conversation) return NextResponse.json({
      message: 'Conversation not found',
      code: 'conversation_not_found',
      success: false,
      data: null
    }, { status: 404 });
    
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get('limit') ?? 30), 100);
    const before = searchParams.get('before');

    const query: Record<string, unknown> = {
      conversation: conversationId,
      is_deleted: false,
      ...(before && {
        createdAt: {
          $lt: new Date(before)
        }
      })
    };

    const messages = await Message.find(query).sort({ createdAt: -1 }).limit(limit)
    .populate('sender.user', 'name email role')
    
    return NextResponse.json({
      message: 'Messages retrieved successfully',
      code: 'messages_retrieved',
      success: true,
      data: {
        hasMore: messages.length === limit,
        messages: messages.reverse()
      }
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