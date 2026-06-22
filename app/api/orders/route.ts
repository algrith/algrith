
import hbs, { NodemailerExpressHandlebarsOptions }  from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

import { Order, User as UserModel } from '@/libs/schema';
import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { User } from 'next-auth';

const POST = authorization(async (request, ctx, user) => {
  try {
    const templatesDir = path.resolve('./templates');
    const origin = request.headers.get('origin');
    const order = await request.json();
    const userId = user.id as string;
    await dbConnect();
    
    const admin = await UserModel.findOne({ role: 'admin', is_verified: true });
    const assignees = admin ? [admin.id] : [];

    const result = await Order.create({
      user: userId,
      assignees,
      ...order
    });
    
    console.log(`Order created --> ${result.id}`);

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: templatesDir,
        extname: '.handlebars',
        defaultLayout: false,
        helpers: {
          eq: (a, b) => a === b,
        }
      },
      viewPath: templatesDir,
      extName: '.handlebars'
    };

    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_MAIL_AUTH_HOST,
      port: process.env.CONTACT_MAIL_AUTH_PORT,
      secure: true,
      auth: {
        user: process.env.CONTACT_MAIL_AUTH_USERNAME,
        pass: process.env.CONTACT_MAIL_AUTH_PASSWORD
      }
    });

    transporter.use('compile', hbs(handlebarOptions));

    const mailOption = {
      from: process.env.CONTACT_MAIL_SENDER,
      to: process.env.CONTACT_MAIL_RECEIVER,
      text: 'New Order Received!',
      subject: 'Order Confirmed',
      template: 'order',
      context: {
        ...order,
        links: {
          support_email: 'algrithllc@gmail.com',
          billing: `${origin}/settings/billing`,
          unsubscribe: `${origin}/unsubscribe`,
          privacy: `${origin}/privacy-policy`,
          terms: `${origin}/terms-of-service`,
          dashboard: `${origin}/dashboard`
        }
      }
    };

    const data = await transporter.sendMail(mailOption);

    return Response.json({
      message: 'Mail sent!',
      success: true,
      data
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      success: false,
      data: {}
    }, { status: 500 });
  }
});

const GET = authorization(async (request, ctx, user) => {
  try {
    const orders = await fetchOrders(user);

    return Response.json({
      message: 'Orders retrieved!',
      code: 'orders_retrieved',
      success: true,
      data: orders
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

const fetchOrders = async (user: User) => {
  await dbConnect();
  const isStaff = ['admin', 'moderator'].includes(user.role);
  const options = isStaff ? (
    user.role === 'moderator' ? { assignees: user.id } : {}
  ) : {
    user: user.id
  };
  
  return await Order.find(options).populate('assignees', 'id name email').sort({ createdAt: -1 });
};

export { POST, GET };