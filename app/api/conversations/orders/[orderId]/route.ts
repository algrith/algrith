import { Conversation } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';
import mongoose from 'mongoose';

const GET = authorization(async (req, ctx, user) => {
  try {
    const { orderId } = await ctx.params as { orderId: string };
    await dbConnect();

    const [conversation] = await Conversation.aggregate([
      {
        $match: {
          'participants.user': new mongoose.Types.ObjectId(user.id),
          order: new mongoose.Types.ObjectId(orderId),
          active: true
        }
      },
      {
        $addFields: {
          current_participant: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$participants',
                  as: 'p',
                  cond: {
                    $eq: ['$$p.user', new mongoose.Types.ObjectId(user.id)]
                  }
                }
              },
              0
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'messages',
          let: {
            conv_id: '$_id',
            last_read: {
              $ifNull: ['$current_participant.last_read', new Date(0)]
            }
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$sender.user', new mongoose.Types.ObjectId(user.id)] },
                    { $eq: ['$conversation', '$$conv_id'] },
                    { $gt: ['$createdAt', '$$last_read'] },
                    { $eq: ['$is_deleted', false] }
                  ]
                }
              }
            },
            { $count: 'count' }
          ],
          as: 'unread_result'
        }
      },
      {
        $lookup: {
          pipeline: [{ $project: { 'plan.name': 1, reference: 1, status: 1 } }],
          localField: 'order',
          foreignField: '_id',
          from: 'orders',
          as: 'order'
        }
      },
      { $unwind: { path: '$order', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          unread: { $ifNull: [{ $arrayElemAt: ['$unread_result.count', 0] }, 0] },
          'order.id': { $toString: '$order._id' }
        }
      },
      {
        $project: {
          current_participant: 0,
          unread_result: 0,
          'order._id': 0
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    if (!conversation) return NextResponse.json({
      message: 'Conversation not found',
      code: 'conversation_not_found',
      success: false,
      data: null
    }, { status: 404 });
    
    const { unread, _id, ...rest } = conversation;
    
    const data = {
      conversation: { id: _id.toString(), ...rest },
      unread
    };
    
    return NextResponse.json({
      message: 'Order conversation retrieved successfully',
      code: 'order_conversation_retrieved',
      success: true,
      data
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

export { GET };