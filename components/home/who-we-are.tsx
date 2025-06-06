import Link from '@/components/shared/button/link';
import { WhoWeAreWrapper } from './styled';

const WhoWeAre = () => {
  return (
    <WhoWeAreWrapper id="who-we-are">
      <h2>
        Your Partner in Cutting-Edge Software Solutions.
      </h2>
      
      <p>
        At Algrith, we are committed to providing sophisticated, secure, and accessible applications tailored for clients across both public and private sectors.{' '}
        By leveraging cutting-edge technology and frameworks, we specialize in delivering scalable and resilient software solutions that precisely align with the dynamic demands of your business.
      </p>
      
      <div>
        <Link type="primary" asButton href="/contact-us">Get Started</Link>
      </div>
    </WhoWeAreWrapper>
  )
};

export default WhoWeAre;