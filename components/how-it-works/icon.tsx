'use client';

import useClassName from '@/hooks/class-name';
import { HowItWorksStepProps } from '@/types';
import { StepIconWrapper } from './styled';

const Icon = ({ color, isFirst, isLast, isLeft }: Partial<HowItWorksStepProps>) => {
  const className = useClassName([
    isFirst ? 'first' : '',
    isLeft ? 'left' : '',
    isLast ? 'last' : '',
    color ? color : ''
  ]);
  
  return (
    <StepIconWrapper className={className}>
      {!isLast && (
        <div className={`ping-wrapper ${color}`}>
          <div className={`ping ${color}`} />
          {isFirst && (<div className="ping first" />)}
        </div>
      )}

      {isFirst && (<div className="line first" />)}
    </StepIconWrapper>
  );
};

export default Icon