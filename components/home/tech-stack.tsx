import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { Avatar } from 'antd';

import { TechStackWrapper } from '@/components/home/styled';
import { techStackImages } from '@/libs/ui-data';
import { toSnakeCase } from '@/utils';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const TechStack = () => {
  return (
    <TechStackWrapper>
      <div className="intro">
        <h1>
          We are versatile with amazing tools.
        </h1>
      </div>
      
      <Carousel
        customTransition="all 1.2s linear"
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        itemClass="carousel-item-class"
        shouldResetAutoplay={false}
        rewindWithAnimation={false}
        transitionDuration={1200}
        renderDotsOutside={false}
        responsive={responsive}
        additionalTransfrom={0}
        minimumTouchDrag={80}
        focusOnSelect={false}
        centerMode={false}
        autoPlaySpeed={1}
        showDots={false}
        keyBoardControl
        arrows={false}
        rewind={false}
        pauseOnHover
        rtl={false}
        swipeable
        draggable
        autoPlay
        infinite
      >
        {techStackImages.map((image) => (
          <div key={image.name} className={image.name}>
            <Avatar
              alt={`${toSnakeCase(image.name)}_logo`}
              src={image?.light || image.dark}
              className="light"
            />

            <Avatar
              alt={`${toSnakeCase(image.name)}_logo`}
              className="dark"
              src={image.dark}
            />
          </div>
        ))}
      </Carousel>
    </TechStackWrapper>
  );
};

export default TechStack;