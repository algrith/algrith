import { useState } from 'react';

import { ContactModel, ResponseData, OrderModel } from '@/types';
import useRecaptcha from './recaptcha';
import { isValidEmail } from '@/utils';
import { Fetch } from '@/utils/api';

const feedbackMessages = {
  reCaptchaError: 'An error occurred! Please reload the page and try again.',
  error: 'An error occurred while sending your message!',
  invalidEmail: 'Your email address in invalid',
  sent: 'Your message was sent successfully!'
};

const initialFeedback = {
  loading: false,
  success: false,
  message: ''
};

const useMailer = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const { executeRecaptcha } = useRecaptcha();

  const sendCheckoutMail = async (payload: OrderModel) => {
    setFeedback({ ...initialFeedback, loading: true });
    const isTokenValid = await verifyReCaptchaToken();
    const feedback = { ...initialFeedback };

    if (!isValidEmail(payload.customer.email)) {
      feedback.message = feedbackMessages.invalidEmail;
    }
    
    if (!isTokenValid) {
      console.error('Google reCaptcha could not be initialized!');
      feedback.message = feedbackMessages.reCaptchaError;
    }

    if (!feedback.message) {
      const { success } = await Fetch({
        path: '/checkout',
        method: 'POST',
        body: payload
      });

      feedback.message = feedbackMessages[success ? 'sent' : 'error'];
      feedback.success = success;
    }

    setFeedback(feedback);
    return feedback;
  };

  const sendMail = async (payload: ContactModel) => {
    setFeedback({ ...initialFeedback, loading: true });
    const isTokenValid = await verifyReCaptchaToken();
    const feedback = { ...initialFeedback };

    if (!isValidEmail(payload.email)) {
      feedback.message = feedbackMessages.invalidEmail;
    }
    
    if (!isTokenValid) {
      console.error('Google reCaptcha could not be initialized!');
      feedback.message = feedbackMessages.reCaptchaError;
    }

    if (!feedback.message) {
      const { success } = await Fetch({
        path: '/contacts',
        method: 'POST',
        body: payload
      });

      feedback.message = feedbackMessages[success ? 'sent' : 'error'];
      feedback.success = success;
    }

    setFeedback(feedback);
    return feedback;
  };

  const verifyReCaptchaToken = async () => {
    const token = await executeRecaptcha('contact');

    const response: ResponseData = await Fetch({
      path: '/recaptcha',
      body: { token },
      method: 'POST'
    });

    return response.success;
  };

  return { sendCheckoutMail, feedback, sendMail };
};

export default useMailer;