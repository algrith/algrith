'use client';

import { Avatar } from 'antd';

import reviews from '@/libs/reviews.json';
import { ReviewsWrapper } from './styled';

const Reviews = () => {
	return (
		<ReviewsWrapper id="reviews">
			<div className="illustration reviews">
				<Avatar src="./images/illustrations/testimonial.gif" alt="reviews_illustration" />
			</div>
			
			<h1 className="left">
				Reviews
			</h1>

			<div className="items">
				{reviews.map((review) => (
          <figure key={review.name} data-aos="fade-up">
            <div className="avatar">
              <Avatar src={review.avatar} alt={`reviewer_${review.name}`} />
            </div>
            <div className="content">
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              
              <figcaption>
                <div className="name">
                  {review.name}
                </div>
        
                <div className="designation">
                  {review.designation}, {review.location}
                </div>
              </figcaption>
            </div>
          </figure>
				))}
			</div>
		</ReviewsWrapper>
	);
};

export default Reviews;