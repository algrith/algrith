'use client';

import { Avatar } from 'antd';

import { OurValuesWrapper } from './styled';

const OurValues = () => {
  return (
    <OurValuesWrapper id="get-started">
      <div className="value-wrapper">
        <div className="image">
          <Avatar className="image" src={'/images/illustrations/processes.jpg'} />
        </div>

        <div className="text">
          <h2>Our Values</h2>
          At the heart of our philosophy are three pillars: Innovation, Integrity, and Impact. We leverage cutting-edge technologies to develop forward-thinking solutions. Our commitment to integrity fosters transparent, trustworthy partnerships. Success, for us, is measured by the tangible impact we deliver — enhancing efficiency, expanding reach, and accelerating growth for your business.
        </div>
      </div>

      <div className="value-wrapper">
        <div className="text">
          <h2>Our Mission</h2>
          We transform complex business needs into intuitive, scalable digital platforms. Our expertise spans robust web applications, dynamic mobile experiences, strategic digital marketing, and secure IT infrastructure — all designed to advance your objectives. Through meticulous execution, continuous learning, and collaboration, we ensure every solution aligns seamlessly with your vision.
        </div>

        <div className="image">
          <Avatar src={'/images/illustrations/our-values.jpg'} />
        </div>
      </div>
    </OurValuesWrapper>
  )
};

export default OurValues;