import { CalendarOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';

import { SessionBookingWrapper } from '@/components/home/components/styled';
import Link from '@/components/shared/button/link';

const SessionBooking = () => {
  return (
    <SessionBookingWrapper>
      <div className="left">
        <h1>
          Looking for ways to optimize your business using technology while saving time and money?
          Not sure how technology can enhance your business?
          Looking for excellence at an affordable rate?
        </h1>
        
        <p>
          Our team of skilled developers is dedicated to creating software that aligns seamlessly with your business goals.
        </p>

        <Link type="primary" asButton href="/contact-us">
          Book a Session
          <CalendarOutlined />
        </Link>
      </div>

      <div className="right">
        <Avatar src="./images/illustrations/session-2.gif" />
      </div>
    </SessionBookingWrapper>
  );
};

export default SessionBooking;