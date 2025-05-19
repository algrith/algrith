'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const GoogleCaptchaWrapper = ({ children }: { children: React.ReactNode }) => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const scriptProps = {
    appendTo: 'head' as 'head' | 'body',
    nonce: undefined,
    async: false,
    defer: false
  };
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey} scriptProps={scriptProps}>
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default GoogleCaptchaWrapper;