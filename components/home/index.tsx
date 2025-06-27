'use client';

import {
  FundProjectionScreenOutlined,
  SlidersOutlined,
  SafetyOutlined,
  GlobalOutlined,
  OpenAIOutlined,
  AlertOutlined,
  FireOutlined,
  RiseOutlined,
  AimOutlined,
  SunOutlined
} from '@ant-design/icons';

import MissionStatement from '@/components/home/mission-statement';
import SessionBooking from '@/components/home/session-booking';
import WelcomeIntro from '@/components/home/welcome-intro';
import Section from '@/components/shared/layout/section';
import GetStarted from '@/components/home/get-started';
import TechStack from '@/components/home/tech-stack';
import WhoWeAre from '@/components/home/who-we-are';
import { IntroProps, SectionProps } from '@/types';
import Projects from '@/components/home/projects';
import Reviews from '@/components/home/reviews';

const whyChooseUsOutlines: SectionProps = {
  illustration: './images/illustrations/team.png',
  title: 'Why choose us',
  id: 'why-choose-us',
  items: [
    {
      content: 'We prioritize timely delivery, ensuring our clients receive efficient solutions that meet their business.',
      title: 'Swift and Accurate',
      icon: <AlertOutlined />,
      subtitle: 'Delivery'
    },
    {
      content: 'We stay ahead of the curve, incorporating the latest technologies to ensure your business remains competitive in a rapidly evolving landscape.',
      icon: <SunOutlined />,
      title: 'Innovative',
      subtitle: 'Skilled'
    },
    {
      content: 'Integrity defines business life span and we are determined to live long with you.',
      icon: <SafetyOutlined />,
      subtitle: 'Reputable',
      title: 'Trusted'
    }
  ]
};

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
      title: 'Data Strategy & Analytics',
      icon: <FundProjectionScreenOutlined />,
      subtitle: 'Reach'
    }
  ]
};

const intro: IntroProps = {
  title: 'The best software algorithm solution',
  action: {
    scrollTo: 'who-we-are',
    icon: <AimOutlined />,
    text: 'Get Started'
  },
  description: {
    text: 'Strategic Digital Solutions for Modern Businesses.'
  }
};

const Home = () => {
  return (
    <>
      <WelcomeIntro id="intro-index" {...intro} />
      <WhoWeAre />
      <Section {...whatWeDoOutlines} />
      <SessionBooking />
      <Section {...whyChooseUsOutlines} />
      <TechStack />
      <MissionStatement />
      {/* <Reviews /> */}
      <Projects />
      <GetStarted />
    </>
  );
};

export default Home;