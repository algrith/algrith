import { Avatar } from 'antd';

import { OurValuesWrapper } from './styled';

const OurValues = () => {
  return (
    <OurValuesWrapper id="get-started">
      <div className="value-wrapper">
        <div className="image">
          <Avatar className="image" src={'/images/illustrations/processes.jpg'} />
        </div>

        <p className="text">
          <h2>Our Values</h2>
          Our core philosophy is built on three pillars: Innovation, Integrity, and Impact. We embrace cutting-edge technologies to craft forward-thinking solutions. We operate with unwavering integrity, fostering transparent and trustworthy partnerships. Ultimately, our success is measured by the tangible impact we create for your business – enhancing efficiency, expanding reach, and accelerating growth.
        </p>
      </div>

      <div className="value-wrapper">
        <p className="text">
          <h2>Our Mission</h2>
          We specialize in transforming complex business requirements into intuitive and scalable digital platforms. From robust web applications and dynamic mobile experiences to strategic digital marketing and secure IT infrastructure, our expertise is designed to propel your objectives forward. We believe in meticulous execution, continuous learning, and a collaborative approach that ensures every solution is perfectly aligned with your vision.
        </p>

        <div className="image">
          <Avatar src={'/images/illustrations/our-values.jpg'} />
        </div>
      </div>
    </OurValuesWrapper>
  )
};

export default OurValues;