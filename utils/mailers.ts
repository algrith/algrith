import hbs, { NodemailerExpressHandlebarsOptions }  from 'nodemailer-express-handlebars';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

import { User } from 'next-auth';

export const sendPasswordResetEmail = (request: NextRequest, user: Partial<User> & { 'token': string }) => {
  const context = getSharedEmailContext(request, user.token);
  const name = user?.name?.split(' ')[0];
  const expires_in = '5 minutes';
  const email = user.email;

  const text = `
    ========================================
    ALGRITH — Strategic Digital Solutions
    ========================================

    Account Security — Reset your password.

    ----------------------------------------

    Hi ${name},

    We received a request to reset the password for your Algrith
    account. Click the link below to choose a new password and
    regain access to your account:

    ${context.password_reset_url}

    ----------------------------------------
    IMPORTANT
    ----------------------------------------

    This reset link will expire in ${expires_in}.

    If you did not request a password reset, you can safely
    ignore this email — your password will remain unchanged.

    ----------------------------------------
    SECURITY TIP
    ----------------------------------------

    Algrith will never ask for your password via email.
    If you did not make this request, please contact our
    support team immediately at ${context.support}.

    ----------------------------------------
    NEED HELP?
    ----------------------------------------

    Reply to this email or reach us at ${context.support} —
    we're always happy to assist.

    ========================================
    © ${context.year} Algrith. All rights reserved.

    Privacy Policy: ${context.privacy_url}
    Terms of Service: ${context.terms_url}
    Support: ${context.support}
    ========================================
  `;

  sendEmail({
    template: 'password-reset',
    subject: 'Password Reset',
    text,
    context: {
      ...context,
      expires_in,
      email,
      name
    }
  } as MailOptions);
};

export const sendVerificationEmail = (request: NextRequest, user: Partial<User> & { 'token': string }) => {
  const context = getSharedEmailContext(request, user.token);
  const name = user?.name?.split(' ')[0];
  const expires_in = '5 minutes';
  const email = user.email;

  const text = `
    ========================================
    ALGRITH — Strategic Digital Solutions
    ========================================

    One last step, ${name}.

    Confirm your email address.

    ----------------------------------------

    Thanks for signing up with Algrith. Before we get started,
    we need to confirm this is really you.

    Click the link below to verify your email address and
    activate your account:

    ${context.verification_url}

    ----------------------------------------
    IMPORTANT
    ----------------------------------------

    This verification link will expire in ${expires_in}.

    If you did not create an account with Algrith, you can
    safely ignore this email. No action is required.

    ----------------------------------------
    NEED HELP?
    ----------------------------------------

    Having trouble with the link? Reply to this email or
    reach us at ${context.support} — we're happy to help.

    ========================================
    © {{year}} Algrith. All rights reserved.

    Privacy Policy: ${context.privacy_url}
    Terms of Service: ${context.terms_url}
    Support: ${context.support}
    ========================================
  `;

  sendEmail({
    template: 'email-verification',
    subject: 'Email Verification',
    text,
    context: {
      ...context,
      expires_in,
      email,
      name
    }
  } as MailOptions);
};

export const sendWelcomeEmail = (request: NextRequest, user: Partial<User>) => {
  const context = getSharedEmailContext(request);
  const name = user?.name?.split(' ')[0];
  const email = user.email;

  const text = `
    ========================================
    ALGRITH — Strategic Digital Solutions
    ========================================

    Welcome aboard, ${name}.

    Your account is ready and we're glad to have you.

    At Algrith, we build strategic digital solutions that help modern
    businesses save time, reduce friction, and grow with confidence.
    You've just taken the first step.

    ----------------------------------------
    GET STARTED
    ----------------------------------------

    Visit your dashboard to explore everything waiting for you:
    ${context.dashboard_url}

    ----------------------------------------
    WHAT'S WAITING FOR YOU
    ----------------------------------------

      • Custom websites tailored to your brand and goals
      • Fast, scalable solutions built for real business needs
      • Dedicated support from strategy to launch

    ----------------------------------------
    NEED HELP?
    ----------------------------------------

    Reply to this email or reach us at algrithllc@gmail.com —
    we're always happy to assist.

    ========================================
    © ${context.year} Algrith. All rights reserved.

    Privacy Policy: ${context.privacy_url}
    Terms of Service: ${context.terms_url}
    Support: ${context.support}
    ========================================
  `;

  sendEmail({
    subject: 'Welcome Aboard',
    template: 'welcome',
    text,
    context: {
      ...context,
      email,
      name
    }
  } as MailOptions);
};

export const getSharedEmailContext = (request: NextRequest, token?: string) => {
  const origin = request.headers.get('origin');
  return {
    password_reset_url: `${origin}/auth/password-reset?token=${token}`,
    verification_url: `${origin}/auth/verify?token=${token}`,
    privacy_url: `${origin}/privacy-policy`,
    terms_url: `${origin}/privacy-policy`,
    dashboard_url: `${origin}/dashboard`,
    support: 'algrithllc@gmail.com',
    year: new Date().getFullYear()
  };
};

const sendEmail = async (options: MailOptions) => {
  try {
    const templatesDir = path.resolve('./templates');

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
      ...options
    };

    transporter.sendMail(mailOption);
  } catch (error) {
    console.error(`Failed to send email --> ${error} ${options}`);
  }
};