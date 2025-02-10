'use client';

import Contact from '@/components/contact/components/contact';
import Intro from '@/components/shared/layout/intro';
import { IntroProps } from '@/types';

const intro: IntroProps = {
  subtitle: `Our response culture is swift`,
  title: `Send in your thoughts!`,
  accomodate: true,
  description: {
    text: `Are you looking for ways to optimize your business using technology to save time and money?\n Looking for business excellence at an affordable rate?\n Not sure how technology can help your business?`,
  },
  action: {
    scrollTo: `contact`,
  }
};

const ContactUs = () => {
  return (
    <>
      <Intro id="intro-about" {...intro} />
      <Contact />
    </>
  );
};

export default ContactUs;