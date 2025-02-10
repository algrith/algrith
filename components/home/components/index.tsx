'use client';

import {
  CheckCircleOutlined,
  LineChartOutlined,
  CompassOutlined,
  RocketOutlined,
  Html5Outlined,
  RobotOutlined,
  FireOutlined,
  StarOutlined
} from '@ant-design/icons';

import MissionStatement from '@/components/home/components/mission-statement';
import SessionBooking from '@/components/home/components/session-booking';
import WelcomeIntro from '@/components/home/components/welcome-intro';
import GetStarted from '@/components/home/components/get-started';
import TechStack from '@/components/home/components/tech-stack';
import WhoWeAre from '@/components/home/components/who-we-are';
import Section from '@/components/shared/layout/section';
import { IntroProps, SectionProps } from '@/types';
import reviewData from '@/libs/reviews.json';

const whyChooseUsOutlines: SectionProps = {
  illustration: './images/illustrations/team.png',
  title: 'Why choose us',
  id: 'why-choose-us',
  items: [
    {
      content: 'Time is a valuable currency of business and we give our clients value in time.',
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
    text: 'We make happy clients'
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