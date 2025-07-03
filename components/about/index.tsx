'use client';

import { FireOutlined, FundProjectionScreenOutlined, GlobalOutlined, OpenAIOutlined, RiseOutlined, SlidersOutlined } from '@ant-design/icons';

import Intro from '@/components/shared/layout/intro';
import { IntroProps, SectionProps } from '@/types';
import Section from '../shared/layout/section';
import GetStarted from './get-started';
import OurValues from './our-values';

const whatWeDoOutlines: SectionProps = {
  illustration: './images/illustrations/girl_3.gif',
  title: 'What we do',
  id: 'what-we-do',
  items: [
    {
      content: `We develop custom web applications that streamline operations, enhance user engagement, and drive business growth.`,
      title: 'Responsive Web Development',
      icon: <GlobalOutlined />,
      subtitle: 'Visibility'
    },
    {
      content: 'Unlock possibilities with our AI services—innovative solutions for smarter automation, enhanced decision-making, and unparalleled efficiency.',
      title: 'Artificial Intelligence',
      icon: <OpenAIOutlined />,
      subtitle: 'Relief'
    },
    {
      content: 'Transform online presence to reflect modern, user-friendly design for a powerful impact!',
      title: 'Website Revamp (Redesign)',
      subtitle: 'Sophistication',
      icon: <FireOutlined />
    },
    {
      content: 'Maximize efficiency, minimize costs. Elevate your business with our tailored solutions for streamlined operations and growth.',
      title: 'Business Optimization',
      icon: <RiseOutlined />,
      subtitle: 'Upgrade'
    },
    {
      content: 'Beyond development, we empower your digital presence through SEO optimization, targeted content creation, and digital marketing campaigns to boost your visibility.',
      title: 'Digital Strategy & Online Growth',
      icon: <SlidersOutlined />,
      subtitle: 'Reach'
    },
    {
      content: 'Design data pipelines, dashboards, and predictive models that help businesses understand trends, optimize operations, and uncover insights.',
      icon: <FundProjectionScreenOutlined />,
      title: 'Data Strategy & Analytics',
      subtitle: 'Analytics'
    }
  ]
};

const intro: IntroProps = {
  title: 'Who we really are!',
  description: {
    text: `We are a software company dedicated to delivering elegant, efficient,\n secure, accessible etc, web applications and websites for use by\n clients both in the public and private sector.`
  },
  subtitle: "Your Strategic Partner in Digital Excellence",
  action: {
    scrollTo: '#what-we-do'
  }
};

const About = () => {
  return (
    <>
      <Intro id="intro-about" {...intro} />
      <OurValues />
      <Section {...whatWeDoOutlines} />
      <GetStarted />
    </>
  );
};

export default About;