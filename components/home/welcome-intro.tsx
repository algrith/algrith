import { AimOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { PingAnimationWrapper, WelcomeIntroWrapper } from './styled';
import Link from '@/components/shared/button/link';
import useTypist from '@/hooks/typist';

const WelcomeIntro = () => {
  useTypist('A Strategic Digital Solutions for Modern Businesses.');

  return (
    <WelcomeIntroWrapper>
      <div className="inner">
        <div data-aos="fade" className="left">
          <span className="typing-pad"></span>
          
          <ul className="description">
            <li><CheckCircleOutlined /> Share detailed insights into your business operations and needs.</li>
            <li><CheckCircleOutlined /> Receive a personalized quote tailored to your business needs.</li>
            <li><CheckCircleOutlined /> Get a professionally crafted digital solution.</li>
          </ul>
          
          <Link type="primary" href="#who-we-are" rounded asButton>
            <PingAnimationWrapper>
              <div className="animator">
                <div className="background" />
              </div>
            </PingAnimationWrapper>

            Get Started
            <AimOutlined />
          </Link>
        </div>

        {/* <div data-aos="fade" className="description right">
          Right content
        </div> */}
      </div>
    </WelcomeIntroWrapper>
  );
};

export default WelcomeIntro;
