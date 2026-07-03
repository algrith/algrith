import { useEffect, useState } from 'react';
import { Fetch } from '@/utils/api';

const useRecaptcha = () => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [isBadgeHidden, hideRecaptchaBadge] = useState(false);
  
  const verifyReCaptchaToken = async (action: string = 'contact') => {
    const token = await executeRecaptcha(action);

    const response = await Fetch({
      path: '/recaptcha',
      body: { token },
      method: 'POST'
    });

    return response.success;
  };

  const executeRecaptcha = async (action: string) => {
    return await window.grecaptcha.execute(recaptchaKey, {
      action
    });
  };

  useEffect(() => {
    if (!isBadgeHidden) return;
    
    const recaptchaElement = document.querySelector('.grecaptcha-badge');
    recaptchaElement?.setAttribute('style', 'display: none !important;');
    hideRecaptchaBadge(!Boolean(recaptchaElement));
  }, [isBadgeHidden]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
    script.async = false;
    script.defer = false;
    document.body.appendChild(script);
    
    script.onload = () => {
      setTimeout(() => {
        hideRecaptchaBadge(true);
      }, 300);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    verifyReCaptchaToken,
    executeRecaptcha
  };
};

export default useRecaptcha;