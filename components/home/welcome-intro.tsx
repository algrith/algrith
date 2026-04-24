import { AimOutlined } from '@ant-design/icons';

import { PingAnimationWrapper, WelcomeIntroWrapper } from './styled';
import Link from '@/components/shared/button/link';
import useTypist from '@/hooks/typist';

const WelcomeIntro = () => {
  useTypist('A Strategic Digital Solutions for Modern Businesses.');

  return (
    <WelcomeIntroWrapper>
      <div className="inner" data-aos="fade">
        <span className="typing-pad"></span>
        
        <ul className="description">
          <li>Share detailed insights into your business operations and needs.</li>
          <li>Receive a personalized quote tailored to your business needs.</li>
          <li>Get a professionally crafted digital solution.</li>
        </ul>
        
        <Link type="primary" href="#what-we-do" rounded asButton shadow>
          <PingAnimationWrapper>
            <div className="animator">
              <div className="background" />
            </div>
          </PingAnimationWrapper>

          Get Started
          <AimOutlined />
        </Link>
      </div>
    </WelcomeIntroWrapper>
  );
};

export default WelcomeIntro;
