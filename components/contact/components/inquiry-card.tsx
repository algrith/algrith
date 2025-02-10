import { Avatar } from 'antd';
import React from 'react';

import { ContactInquiryCardWrapper } from './styled';
import Link from '@/components/shared/button/link';

const ContactInquiryCard = () => {
  return (
    <ContactInquiryCardWrapper>
      <div className="inner">
        <div className="image-wrapper">
          <Avatar src="/images/illustrations/learn-more.gif" alt="learn_more_icon" />
        </div>
        
        <div className="content">
          <h3>Do you need understanding on how our system works?</h3>

          <div className="link">
            <Link rounded size="small" asButton href="/how-it-works">Learn Now</Link>
          </div>
        </div>
      </div>
    </ContactInquiryCardWrapper>
  );
};

export default ContactInquiryCard;