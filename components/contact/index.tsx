'use client';

import Intro from '@/components/shared/layout/intro';
import Contact from '@/components/contact/contact';
import useRecaptcha from '@/hooks/recaptcha';
import { IntroProps } from '@/types';

const intro: IntroProps = {
  subtitle: `Reach out for answers`,
  title: `Send in your thoughts!`,
  accomodate: true,
  description: {
    text: `
      Are you looking for ways to optimize your business using technology to save time and money?
      <br />Looking for business excellence at an affordable rate?
      <br />Not sure how technology can help your business?
    `,
  },
  action: {
    scrollTo: `#contact`,
  }
};

const ContactUs = () => {
  useRecaptcha();

  return (
    <>
      <Intro id="intro-contact" {...intro} />
      <Contact />
    </>
  );
};

export default ContactUs;