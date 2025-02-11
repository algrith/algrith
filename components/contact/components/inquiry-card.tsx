import { Avatar } from 'antd';
import React from 'react';

import { ContactInquiryCardWrapper } from './styled';
import Link from '@/components/shared/button/link';

const ContactInquiryCard = () => {
  return (
    <ContactInquiryCardWrapper>
      <div className="wrapper">
        <div className="image-wrapper">
          <Avatar src="/images/illustrations/learn-more.gif" alt="learn_more_icon" />
        </div>
        
        <div className="content">
          <p>Do you need understanding on how our system works?</p>
          <Link rounded size="small" asButton href="/how-it-works">Learn Now</Link>
        </div>
      </div>
    </ContactInquiryCardWrapper>
  );
};

export default ContactInquiryCard;