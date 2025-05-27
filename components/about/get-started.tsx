import Link from '@/components/shared/button/link';
import { GetStartedWrapper } from './styled';

const GetStarted = () => {
  return (
    <GetStartedWrapper id="get-started">
      <h2>
        Ready to elevate your digital presence?
      </h2>

      <p>
        Let's discuss how Algrith can transform your ideas into powerful digital solutions.
      </p>

      <div>
        <Link type="primary" asButton href="/contact-us">Get Started</Link>
      </div>
    </GetStartedWrapper>
  )
};

export default GetStarted;