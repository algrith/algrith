'use client';

import Intro from '../shared/layout/intro';
import { PricingWrapper } from './styled';
import Addons from './addons';
import Plans from './plans';

const Pricing = ({ inHomePage = false }) => {
  return (
    <>
      {!inHomePage && (
        <Intro
          title="Pricing"
          description={{
            text: `
              Simple, transparent pricing that scales with your team.
              <br />
              Choose a plan that fits your needs — no hidden fees, no surprises.
            `
          }}
        />
      )}
      
      <PricingWrapper>
        <Plans inHomePage={inHomePage} />
        {!inHomePage && <Addons />}
      </PricingWrapper>
    </>
  );
};

export default Pricing