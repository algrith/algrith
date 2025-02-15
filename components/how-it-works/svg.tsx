'use client';

import { HowItWorksStepProps } from '@/types';
import { SvgWrapper } from './styled';


const Svg = ({ color, isLeft, icon }: Partial<HowItWorksStepProps>) => (
  <SvgWrapper className={`${color} ${isLeft ? 'left' : ''}`}>
    <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} fill="none">
      <path strokeLinejoin="round" strokeLinecap="round" d={icon} />
    </svg>
  </SvgWrapper>
);

export default Svg