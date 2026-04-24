'use client';

import { useState } from 'react';
import { Tag } from 'antd';

import Link from '@/components/shared/button/link';
import Button from '@/components/shared/button';
import useClassName from '@/hooks/class-name';
import PaymentModal from './modals/payment';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils';
import { PlansWrapper } from './styled';
import { plans } from '@/libs/plans';
import { Plan } from '@/types';

const Plans = ({ inHomePage = false }) => {
  const className = useClassName([inHomePage ? 'in-home-page' : '']);
  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const router = useRouter();

  const handleClick = (plan: Plan) => () =>  {
    if (plan.name === 'Enterprise') {
      return router.push('/contact-us');
    }

    setPlan(plan);
  };

  const handleClose = () => {
    setPlan(undefined);
  }

  return (
    <PlansWrapper className={className}>
      <h1>Website Packages</h1>

      <div className="plans">
        {plans.map((plan) => (
          <div key={plan.name} className="plan">
            <div className="metadata">
              <div>
                <h2 className="name">
                  {plan.name}
                  {plan.most_popular && (
                    <Tag color="orange-inverse" bordered={false}>
                      Most popular
                    </Tag>
                  )}
                </h2>
                
                <p className="description">
                  {plan.description}
                </p>
              </div>
              
              <div className="price">
                <p className="amount">
                  {plan.name !== 'Enterprise' ? formatCurrency(plan.price) : 'Custom'}
                </p>
                
                {plan.one_time_payment && (
                  <small className="tag">
                    one-time payment
                  </small>
                )}
              </div>
            </div>

            <ul className="features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className="check">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button onClick={handleClick(plan)} type="primary" block>
              {plan.action}
            </Button>
          </div>
        ))}
      </div>

      {inHomePage && (
        <Link href="/pricing" type="primary" asButton>
          ➝ See Pricing
        </Link>
      )}

      <PaymentModal
        onCancel={handleClose}
        plan={plan}
      />
    </PlansWrapper>
  );
};

export default Plans;