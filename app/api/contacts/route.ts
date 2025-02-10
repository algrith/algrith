import hbs, { NodemailerExpressHandlebarsOptions }  from 'nodemailer-express-handlebars';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

import { ResponseData } from '@/types';

const response = (data: ResponseData, status: number) => Response.json(data, { status });

const POST = async (request: NextRequest) => {
  const baseResponse = { message: 'Server error', success: false, data: {} };

  try {
    const templatesDir = path.resolve('./templates');
    const {
      customTopic,
      template,
      subject,
      country,
      message,
      phone,
      topic,
      email,
      name
    } = await request.json();

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: templatesDir,
        extname: '.handlebars',
        defaultLayout: false
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
      text: message,
      template,
      subject,
      context: {
        customTopic,
        country,
        message,
        topic,
        email,
        phone,
        name
      }
    };

    const data = await transporter.sendMail(mailOption);

    return response({
      message: 'Mail sent!',
      success: true,
      data
    }, 200);
  } catch (error) {
    console.log(error);
    
    return response(baseResponse, 500);
  }
};

export { POST };