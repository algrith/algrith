import { showFeedback } from '@/components/shared/feedback/reducer';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';

const feedbackMessages = {
  error: 'An error occurred while sending your message!',
  sent: 'Your message was sent successfully!'
};

const initialFeedback = {
  loading: false,
  success: false,
  message: ''
};

const useSendMail = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const dispatch = useAppDispatch();
  
  const sendMail = (payload: any) => {
    setFeedback({ ...initialFeedback, loading: true });
    
    fetch('/api/contacts', {
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      mode: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(showFeedback({
          message: feedbackMessages.sent,
          feedbackType: 'alert',
          type: 'success'
        }));

        setFeedback({
          message: feedbackMessages.sent,
          loading: false,
          success: true
        });
      }
    }).catch((error) => {
      setFeedback({ ...initialFeedback, message: feedbackMessages.error });
      console.log('An error occurred while sending message!', error);
      
      dispatch(showFeedback({
        message: feedbackMessages.error,
        feedbackType: 'alert',
        type: 'error'
      }));
    });
  };

  return { feedback, sendMail };
};

export default useSendMail;