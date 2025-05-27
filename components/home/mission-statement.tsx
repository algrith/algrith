import { BulbOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';

import { MissionStatementWrapper } from '@/components/home/styled';
import Link from '@/components/shared/button/link';

const MissionStatement = () => {
  return (
    <MissionStatementWrapper>
      <div className="left">
        <h1>
          Enhance your digital presence with Algrith, allowing you to concentrate on growing your business.
        </h1>

        <p>
          <span>
            Delegate your online presence to us! We specialize in enhancing visibility, managing content, and optimizing engagement.{' '}
          </span>
          Concentrate on business growth, while we ensure your brand shines brightly in the digital landscape.
          <span> Elevate your online journey with our expertise.</span>
        </p>
        
        <Link asButton type="secondary" href="/contact-us">
          Learn How
          <BulbOutlined />
        </Link>
      </div>

      <div className="right">
        <Avatar src="./images/illustrations/dribbble.gif" alt="learn_how_illustration" />
      </div>
    </MissionStatementWrapper>
  );
};

export default MissionStatement;