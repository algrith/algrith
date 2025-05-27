'use client';

import { Html5Outlined, LineChartOutlined, RobotOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';

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
      icon: <Html5Outlined />,
      subtitle: 'Visibility'
    },
    {
      content: 'Unlock possibilities with our AI services—innovative solutions for smarter automation, enhanced decision-making, and unparalleled efficiency.',
      title: 'Artificial Intelligence',
      icon: <RobotOutlined />,
      subtitle: 'Relief'
    },
    {
      content: 'Transform online presence to reflect modern, user-friendly design for a powerful impact!',
      title: 'Website Revamp (Redesign)',
      subtitle: 'Sophistication',
      icon: <StarOutlined />
    },
    {
      content: 'Maximize efficiency, minimize costs. Elevate your business with our tailored solutions for streamlined operations and growth.',
      title: 'Business Optimization',
      icon: <LineChartOutlined />,
      subtitle: 'Upgrade'
    },
    {
      content: 'Beyond development, we empower your digital presence through SEO optimization, targeted content creation, and digital marketing campaigns to boost your visibility.',
      title: 'Digital Strategy & Online Growth',
      icon: <SearchOutlined />,
      subtitle: 'Reach'
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
    scrollTo: 'outline'
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