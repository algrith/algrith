import { useEffect } from 'react';

const useRecaptcha = () => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  const executeRecaptcha = async (action: string) => {
    return await window.grecaptcha.execute(recaptchaKey, {
      action
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
    script.async = false;
    script.defer = false;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { executeRecaptcha };
};

export default useRecaptcha;