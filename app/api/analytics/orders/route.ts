import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { Order } from '@/libs/schema';
import mongoose from 'mongoose';

const GET = authorization(async (request, ctx, user) => {
  try {
    const isAdmin = user.role === 'admin';
    await dbConnect();
    
    const analytics = await Order.aggregate([
      ...(isAdmin ? [] : [{ $match: { user: new mongoose.Types.ObjectId(user.id) } }]),
      {
        $facet: {
          status: [
            { $group: { _id: '$status', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          plan: [
            {
              $group: {
                average_revenue: { $avg: '$total' },
                total_revenue: { $sum: '$total' },
                count: { $sum: 1 },
                _id: '$plan.name'
              }
            },
            { $sort: { total_revenue: -1 } }
          ],
          revenue: [
            {
              $group: {
                addon_total: { $sum: '$addon_total' },
                average: { $avg: '$total' },
                total: { $sum: '$total' },
                _id: null
              }
            }
          ],
          timeline: [
            {
              $group: {
                _id: {
                  month: { $month: '$createdAt' },
                  year: { $year: '$createdAt' }
                },
                revenue: { $sum: '$total' },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
          ],
          addon: [
            { $unwind: { path: '$addons', preserveNullAndEmptyArrays: false } },
            {
              $group: {
                total_revenue: { $sum: '$addons.price' },
                count: { $sum: 1 },
                _id: '$addons.id'
              }
            },
            { $sort: { count: -1 } }
          ],
          summary: [
            {
              $group: {
                one_time_payment_orders: {
                  $sum: { $cond: ['$plan.one_time_payment', 1, 0] }
                },
                total_orders: { $sum: 1 },
                paid_orders: {
                  $sum: { $cond: [{ $ifNull: ['$paid_at', false] }, 1, 0] }
                },
                _id: null
              }
            }
          ]
        }
      },
      {
        $addFields: {
          revenue: { $arrayElemAt: ['$revenue', 0] },
          summary: { $arrayElemAt: ['$summary', 0] },
          plan: {
            $arrayToObject: {
              $map: {
                input: '$plan',
                as: 'item',
                in: {
                  k: '$$item._id',
                  v: {
                    average_revenue: '$$item.average_revenue',
                    total_revenue: '$$item.total_revenue',
                    count: '$$item.count'
                  }
                }
              }
            }
          },
          status: {
            $arrayToObject: {
              $map: {
                input: '$status',
                as: 'item',
                in: {
                  v: '$$item.count',
                  k: '$$item._id'
                }
              }
            }
          }
        }
      },
      {
        $project: {
          status: 1,
          plan: 1,
          timeline: {
            $map: {
              input: '$timeline',
              as: 'item',
              in: {
                month: '$$item._id.month',
                revenue: '$$item.revenue',
                year: '$$item._id.year',
                count: '$$item.count'
              }
            }
          },
          addon: {
            $map: {
              input: '$addon',
              as: 'item',
              in: {
                total_revenue: '$$item.total_revenue',
                count: '$$item.count',
                id: '$$item._id'
              }
            }
          },
          revenue: {
            addon_total: '$revenue.addon_total',
            average: '$revenue.average',
            total: '$revenue.total'
          },
          summary: {
            one_time_payment_orders: '$summary.one_time_payment_orders',
            total_orders: '$summary.total_orders',
            paid_orders: '$summary.paid_orders'
          }
        }
      }
    ]);
    
    const data = analytics[0];

    return Response.json({
      message: 'Order analytics retrieved!',
      code: 'order_analytics_retrieved',
      success: true,
      data
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
});

export { GET }