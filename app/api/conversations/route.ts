import { createConversation, createMessage } from '@/utils/server/controllers';
import { Conversation, } from '@/libs/schema';
import { authorization } from '@/middleware';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/utils/db';
import { Document } from 'mongodb';
import mongoose from 'mongoose';

const POST = authorization(async (req, ctx, user) => {
  try {
    const { customerId, message: messagePayload, orderId } = await req.json();
    await dbConnect();
    
    const conversation = await createConversation(user, customerId, messagePayload, orderId);
    if (conversation instanceof NextResponse) return conversation;
    
    const message = await createMessage(user, conversation.id, messagePayload);
    if (message instanceof NextResponse) return message;
    
    return NextResponse.json({
      message: 'Conversation created successfully',
      code: 'conversation_created',
      success: true,
      data: {
        conversation,
        message
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
    await dbConnect();

    const [result] = await Conversation.aggregate([
      // 1. Only conversations this user is part of
      {
        $match: {
          'participants.user': new mongoose.Types.ObjectId(user.id),
          active: true
        }
      },
      // 2. Pull in the user's own participant entry to get their last_read
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
      // 3. Join with messages — only those after last_read and not from this user
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
      // 4. Flatten the count result
      {
        $addFields: {
          unread: {
            $ifNull: [{
              $arrayElemAt: ['$unread_result.count', 0]
            },
            0
          ]}
        }
      },
      // 5. Populate order
      {
        $lookup: {
          localField: 'order',
          foreignField: '_id',
          from: 'orders',
          pipeline: [
            {
              $project: {
                'plan.name': 1,
                reference: 1,
                status: 1
              }
            }
          ],
          as: 'order'
        }
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$order'
        }
      },
      // 6. Populate participants.user
      {
        $lookup: {
          localField: 'participants.user',
          as: 'populated_users',
          foreignField: '_id',
          from: 'users',
          pipeline: [
            {
              $project: {
                email: 1,
                name: 1,
                role: 1
              }
            }
          ]
        }
      },
      // 7. Re-attach populated users back into participants array
      {
        $addFields: {
          participants: {
            $map: {
              input: '$participants',
              as: 'p',
              in: {
                last_read: '$$p.last_read',
                role: '$$p.role',
                user: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        cond: { $eq: ['$$u._id', '$$p.user'] },
                        input: '$populated_users',
                        as: 'u'
                      }
                    },
                    0
                  ]
                }
              }
            }
          }
        }
      },
      // 8. Clean up temporary fields
      {
        $project: {
          current_participant: 0,
          populated_users: 0,
          unread_result: 0
        }
      },
      // 9. Remap _id → id for nested objects
      {
        $addFields: {
          // order
          order: {
            $cond: {
              if: { $ifNull: ['$order', false] },
              then: {
                id: { $toString: '$order._id' },
                reference: '$order.reference',
                status: '$order.status',
                plan: '$order.plan'
              },
              else: null
            }
          },
          // last_message
          last_message: {
            $cond: {
              if: { $ifNull: ['$last_message', false] },
              then: {
                id: { $toString: '$last_message._id' },
                text: '$last_message.text',
                createdAt: '$last_message.createdAt',
                sender: { $toString: '$last_message.sender' }
              },
              else: null
            }
          },
          // participants.user
          participants: {
            $map: {
              input: '$participants',
              as: 'p',
              in: {
                last_read: '$$p.last_read',
                role: '$$p.role',
                user: {
                  id: { $toString: '$$p.user._id' },
                  email: '$$p.user.email',
                  name: '$$p.user.name',
                  role: '$$p.user.role'
                }
              }
            }
          }
        }
      },
      { $sort: { updatedAt: -1 } },
      {
        $facet: {
          conversations: [],
          total_unread: [
            {
              $group: {
                _id: null,
                count: { $sum: '$unread' }
              }
            }
          ]
        }
      }
    ]);
    
    const data = result.conversations.map(({ _id, __v, ...rest }: Document) => ({
      id: _id.toString(),
      ...rest
    }));
    
    const total_unread = result.total_unread[0]?.count ?? 0;

    return NextResponse.json({
      message: 'Conversations retrieved successfully',
      code: 'conversations_retrieved',
      success: true,
      data: {
        conversations: data,
        total_unread
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