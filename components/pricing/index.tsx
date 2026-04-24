'use client';

import useClassName from '@/hooks/class-name';
import { PricingWrapper } from './styled';
import Addons from './addons';
import Plans from './plans';

const Pricing = ({ inHomePage = false }) => {
  const className = useClassName([
    inHomePage ? 'in-home-page' : ''
  ]);

  return (
    <PricingWrapper className={className}>
      <div className="title">
        <h1>Pricing</h1>
        <p>
          Simple, transparent pricing that scales with your team. Choose a plan that fits your needs — no hidden fees, no surprises.
        </p>
      </div>
      
      <div className="content">
        <Plans inHomePage={inHomePage} />
        {!inHomePage && <Addons />}
      </div>
    </PricingWrapper>
  );
};

export default Pricing