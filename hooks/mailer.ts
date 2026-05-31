import { useState } from 'react';

import { ContactModel, ResponseData } from '@/types';
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

  const verifyReCaptchaToken = async (action: string = 'contact') => {
    const token = await executeRecaptcha(action);

    const response: ResponseData = await Fetch({
      path: '/recaptcha',
      body: { token },
      method: 'POST'
    });

    return response.success;
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

  return { feedback, sendMail };
};

export default useMailer;