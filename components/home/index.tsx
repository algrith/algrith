'use client';

import {
  CheckCircleOutlined,
  LineChartOutlined,
  CompassOutlined,
  SearchOutlined,
  RocketOutlined,
  Html5Outlined,
  RobotOutlined,
  FireOutlined,
  StarOutlined
} from '@ant-design/icons';

import MissionStatement from '@/components/home/mission-statement';
import SessionBooking from '@/components/home/session-booking';
import WelcomeIntro from '@/components/home/welcome-intro';
import Section from '@/components/shared/layout/section';
import GetStarted from '@/components/home/get-started';
import TechStack from '@/components/home/tech-stack';
import WhoWeAre from '@/components/home/who-we-are';
import { IntroProps, SectionProps } from '@/types';
import reviewData from '@/libs/reviews.json';

const whyChooseUsOutlines: SectionProps = {
  illustration: './images/illustrations/team.png',
  title: 'Why choose us',
  id: 'why-choose-us',
  items: [
    {
      content: 'We prioritize timely delivery, ensuring our clients receive efficient solutions that meet their business.',
      title: 'Swift and Accurate',
      icon: <RocketOutlined />,
      subtitle: 'Delivery'
    },
    {
      content: 'We stay ahead of the curve, incorporating the latest technologies to ensure your business remains competitive in a rapidly evolving landscape.',
      icon: <FireOutlined />,
      title: 'Innovative',
      subtitle: 'Skilled'
    },
    {
      content: 'Integrity defines business life span and we are determined to live long with you.',
      icon: <CheckCircleOutlined />,
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

const reviews: SectionProps = {
  illustration: './images/illustrations/testimonial.gif',
  items: reviewData,
  id: 'reviews',
  title: {
    alignment: 'left',
    text: 'Reviews'
  }
};

const intro: IntroProps = {
  title: 'The best software algorithm solution',
  action: {
    icon: <CompassOutlined />,
    scrollTo: 'who-we-are',
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
      <Section {...reviews} />
      <GetStarted />
    </>
  );
};

export default Home;