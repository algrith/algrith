'use client';

import { useEffect, useState } from 'react';
import { Tag } from 'antd';

import { showFeedback } from '../shared/feedback/reducer';
import Link from '@/components/shared/button/link';
import Button from '@/components/shared/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useClassName from '@/hooks/class-name';
import PaymentModal from './modals/payment';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils';
import { PlansWrapper } from './styled';
import { plans } from '@/libs/plans';
import useRoute from '@/hooks/route';
import { Plan } from '@/types';

const Plans = ({ inHomePage = false }) => {
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const className = useClassName([inHomePage ? 'in-home-page' : '']);
  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const { searchParams, pathname } = useRoute();
  const planName = searchParams.get('planName');
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const handleClick = (plan: Plan) => () =>  {
    if (plan.name === 'enterprise') return router.push('/contact-us');
    if (!authUser) redirectToAuth(plan);
    setPlan(plan);
  };

  const redirectToAuth = (plan: Plan) => {
    localStorage.lastVisitedRoute = `${pathname}?planName=${plan.name}`;
  
    dispatch(showFeedback({
      message: 'You must login first to continue!',
      feedbackType: 'alert'
    }));
  
    setTimeout(() => router.push('/auth'), 2000);
  };

  const handleClose = () => {
    setPlan(undefined);
  };

  useEffect(() => {
    if (!planName) return;
    const plan = plans.find(({ name }) => name === planName);
    router.replace(pathname);
    if (plan) setPlan(plan);
  }, [planName]);

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
                  {plan.name !== 'enterprise' ? formatCurrency(plan.price) : 'Custom'}
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