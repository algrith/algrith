import { GetStartedWrapper } from '@/components/home/components/styled';
import Link from '@/components/shared/button/link';
import { Avatar } from 'antd';

const GetStarted = () => {
  return (
    <GetStartedWrapper>
      <div className="shadow-wrapper">
        <div className="left">
          <h1>
            Responsive designs for your web app.
          </h1>
          <p>
            🎉 Our designs are sleek and responsive, ensuring a seamless experience across all devices. 
            Whether you're on a desktop, tablet, or mobile, enjoy a visually stunning and user-friendly interface. 
            <span>
              {' '}Explore effortlessly and stay connected with our latest updates.
            </span>
          </p>

          <Link asButton type="tertiary" href="/contact-us">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </Link>
        </div>

        <div className="right">
          <Avatar src="./images/illustrations/responsive.gif" alt="responsive_design_illustration" />
        </div>
      </div>
    </GetStartedWrapper>
  );
};

export default GetStarted;