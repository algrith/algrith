import { createMessage } from '@/utils/server/controllers';
import { Message, Conversation } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';

const POST = authorization(async (req, ctx, user) => {
  try {
    const { conversationId } = await ctx.params as { conversationId: string };
    const payload = await req.json();
    await dbConnect();
    
    const message = await createMessage(user, conversationId, payload);
    if (message instanceof NextResponse) return message;
    
    return NextResponse.json({
      message: 'Message created successfully',
      code: 'message_created',
      success: true,
      data: message
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