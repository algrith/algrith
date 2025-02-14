'use client';

import { Html5Outlined, LineChartOutlined, RobotOutlined, StarOutlined } from '@ant-design/icons';

import Intro from '@/components/shared/layout/intro';
import { IntroProps, SectionProps } from '@/types';
import Section from '../shared/layout/section';

const whatWeDoOutlines: SectionProps = {
  illustration: './images/illustrations/girl_3.gif',
  title: 'What we do',
  id: 'what-we-do',
  items: [
    {
      content: 'Elevate businesses with cutting-edge web applications. Seamless, efficient, and tailored solutions for success.',
      title: 'Web Application Development',
      icon: <Html5Outlined />,
      subtitle: 'Exposure'
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
    }
  ]
};

const intro: IntroProps = {
  title: 'Who we really are!',
  description: {
    text: `We are a software company dedicated to delivering elegant, efficient,\n secure, accessible etc, web applications and websites for use by\n clients both in the public and private sector.`,
  },
  subtitle: "We make happy clients",
  action: {
    scrollTo: 'outline'
  }
};

const About = () => {
  return (
    <>
      <Intro id="intro-about" {...intro} />
      <Section {...whatWeDoOutlines} />
    </>
  );
};

export default About;