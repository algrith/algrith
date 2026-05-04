import hbs, { NodemailerExpressHandlebarsOptions }  from 'nodemailer-express-handlebars';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

import { OrderModel, ResponseData } from '@/types';
import { client } from '@/utils/db';

const response = (data: ResponseData, status: number) => Response.json(data, { status });

const POST = async (request: NextRequest) => {
  try {
    const { customer, addons, order, plan } = await request.json();
    const templatesDir = path.resolve('./templates');
    const origin = request.headers.get('origin');
    saveOrder({ customer, addons, order, plan });

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
      text: 'New checkout order received!',
      subject: 'Order Confirmed',
      template: 'checkout',
      context: {
        customer,
        addons,
        order,
        plan,
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

    return response({
      message: 'Mail sent!',
      success: true,
      data
    }, 200);
  } catch (error) {
    console.error('Server Error', error);
    
    return response({
      message: 'Server Error',
      success: false,
      data: {}
    }, 500);
  }
};

const saveOrder = async (order: OrderModel) => {
  const database = client.db('algrith');
  const orders = database.collection('orders');
  const result = await orders.insertOne(order);
  console.log(
    `A document was inserted with the _id: ${result.insertedId}`,
  );
};

export { POST };