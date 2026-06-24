'use client';

import { TypingIndicatorWrapper } from './styled';
import { TypingEventData } from '@/types';

const TypingIndicator = ({ isTyping, typing }: { typing?: TypingEventData, isTyping: boolean; }) => {
  if (!isTyping) return null;
  
  return (
    <TypingIndicatorWrapper>
      <small>{typing?.participant || 'User'}</small>
      <div className="animators">
        <span />
        <span />
        <span />
      </div>
    </TypingIndicatorWrapper>
  );
};

export default TypingIndicator;