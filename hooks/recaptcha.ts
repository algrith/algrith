import { Fetch } from '@/utils/api';
import { useEffect } from 'react';

const useRecaptcha = () => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  const verifyReCaptchaToken = async (action: string) => {
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

  const hideBadge = () => {
    const recaptchaElement = document.querySelector('.grecaptcha-badge');
    recaptchaElement?.setAttribute('style', 'display: none !important;');
    if (!recaptchaElement) setTimeout(hideBadge, 500);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
    script.async = false;
    script.defer = false;
    document.body.appendChild(script);
    
    script.onload = () => {
      hideBadge();
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