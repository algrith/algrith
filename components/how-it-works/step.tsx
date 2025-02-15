'use client';

import { ContentWrapper, IconWrapper, StepWrapper } from './styled';
import useClassName from '@/hooks/class-name';
import { HowItWorksStepProps } from '@/types';
import Icon from './icon';
import Svg from './svg';

const Step = (props: HowItWorksStepProps) => {
  const {content, color, title, step, isLeft} = props;
  const className = useClassName([
    isLeft ? 'left' : ''
  ]);
  
  return (
    <StepWrapper className={className}>
      <ContentWrapper className={className}>
        <div className={`inner ${color}`}>
          <h2 className={`step ${color}`}>
            Step {step}
          </h2>
          
          <h2 className={`title title-font ${color}`}>
            {title}
          </h2>
          
          <p>{content}</p>
        </div>
      </ContentWrapper>
      
      <IconWrapper className={className}>
        <Svg {...props} />
        <Icon {...props} />
      </IconWrapper>
    </StepWrapper>
  );
};

export default Step