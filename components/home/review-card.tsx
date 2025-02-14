import { Avatar } from 'antd';

import { ReviewCardWrapper } from '@/components/home/styled';
import { Review } from '@/types';

const ReviewCard = ({ designation, location, avatar, text, name }: Review) => (
  <ReviewCardWrapper key={name} data-aos="fade-up">
    <div className="avatar">
      <Avatar src={avatar} alt={`reviewer_${name}`} />
    </div>
    <div className="content">
      <blockquote>
        <p>{text}</p>
      </blockquote>
      
      <figcaption>
        <div className="name">
          {name}
        </div>

        <div className="designation">
          {designation}, ${location}
        </div>
      </figcaption>
    </div>
  </ReviewCardWrapper>
);

export default ReviewCard;