
import hbs, { NodemailerExpressHandlebarsOptions }  from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

import { authorization } from '@/middleware';
import { dbConnect } from '@/utils/db';
import { Order } from '@/libs/schema';

const POST = authorization(async (request, ctx, user) => {
  try {
    const templatesDir = path.resolve('./templates');
    const origin = request.headers.get('origin');
    const order = await request.json();
    const userId = user.id as string;
    await dbConnect();
    
    const result = await Order.create({
      user: userId,
      ...order
    });
    
    console.log(`Order created --> : ${result.id}`);

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
    const data = await fetchOrders(user.id as string);

    return Response.json({
      message: 'Orders retrieved!',
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

const fetchOrders = async (userId: string) => {
  await dbConnect();
  return await Order.find({ user: userId });
};

export { POST, GET };