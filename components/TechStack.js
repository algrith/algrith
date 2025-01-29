import React from 'react';

import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

const TechStack = () => {
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

  const tech_stack_images = [
    {
      dark: '/images/tech-stack/javascript.png',
      class: 'scale-45 md:scale-65',
      name: 'javascript',
    },
    {
      dark: '/images/tech-stack/php.png',
      class: 'scale-65 md:scale-75',
      name: 'php',
    },
    {
      dark: '/images/tech-stack/python-light.png',
      light: '/images/tech-stack/python.png',
      name: 'python',
    },
    {
      dark: '/images/tech-stack/bash-light.png',
      light: '/images/tech-stack/bash.png',
      class: 'md:scale-85',
      name: 'bash',
    },
    {
      dark: '/images/tech-stack/mongodb-light.png',
      light: '/images/tech-stack/mongodb.png',
      name: 'mongodb',
    },
    {
      dark: '/images/tech-stack/firebase-light.png',
      light: '/images/tech-stack/firebase.png',
      name: 'firebase',
    },
    {
      dark: '/images/tech-stack/redis-light.png',
      light: '/images/tech-stack/redis.png',
      name: 'redis',
    },
    {
      dark: '/images/tech-stack/mysql.png',
      class: 'md:scale-75',
      name: 'mysql',
    },
    {
      dark: '/images/tech-stack/flask.png',
      name: 'flask',
    },
    {
      dark: '/images/tech-stack/react-light.png',
      light: '/images/tech-stack/react.png',
      name: 'reactjs',
    },
    {
      dark: '/images/tech-stack/laravel.png',
      name: 'laravel',
    },
    {
      dark: '/images/tech-stack/nodejs.svg',
      name: 'nodejs',
    },
    {
      dark: '/images/tech-stack/expressjs-light.svg',
      light: '/images/tech-stack/expressjs.png',
      name: 'expressjs',
    },
    {
      dark: '/images/tech-stack/tensorflow-light.png',
      light: '/images/tech-stack/tensorflow.png',
      name: 'tensorflow',
    },
    {
      dark: '/images/tech-stack/pytorch-light.png',
      light: '/images/tech-stack/pytorch.png',
      name: 'pytorch',
    },
    {
      dark: '/images/tech-stack/opencv-light.png',
      light: '/images/tech-stack/opencv.png',
      name: 'opencv',
    },
    {
      dark: '/images/tech-stack/onnx-light.png',
      light: '/images/tech-stack/onnx.png',
      name: 'onnx',
    },
    {
      dark: '/images/tech-stack/scikit-learn.png',
      class: 'scale-45 md:scale-65',
      name: 'scikit_learn',
    },
    {
      dark: '/images/tech-stack/looker-studio.png',
      name: 'looker-studio',
    },
    {
      dark: '/images/tech-stack/prophet.png',
      name: 'prophet',
    },
    {
      dark: '/images/tech-stack/fast-api.png',
      name: 'fast_api',
    },
    {
      dark: '/images/tech-stack/google-cloud.png',
      name: 'google_cloud',
    },
    {
      dark: '/images/tech-stack/microsoft-azure.png',
      name: 'microsoft_azure',
    },
    {
      dark: '/images/tech-stack/tailwindcss-light.png',
      light: '/images/tech-stack/tailwindcss.png',
      name: 'tailwindcss',
    },
    {
      dark: '/images/tech-stack/bootstrap.png',
      class: 'scale-45 md:scale-65',
      name: 'bootstrapcss',
    },
    {
      dark: '/images/tech-stack/docker.avif',
      name: 'docker',
    },
    {
      dark: '/images/tech-stack/git-light.png',
      light: '/images/tech-stack/git.png',
      name: 'git',
    }
  ]

  return (
    <div className="dark:bg-dark-mode-secondary bg-theme-secondary/10 w-full px-8 md:px-12 lg:px-20 xl:px-28 pt-8 lg:pt-12 pb-10 lg:pb-14">
      <div className="2xl:w-8/12 2xl:mx-auto">
        <div className="w-full md:w-3/3 mx-auto sm:mb-6">
          <h1 className="xl:text-4xl md:text-3xl font-nunito-black text-xl text-center text-theme-secondary font-extrabold mb-5 pt-4">
            We are versatile with amazing tools.
          </h1>
        </div>
        
        <Carousel
          itemClass="flex items-center md:px-12 px-6 justify-center"
          customTransition="all 1.2s linear"
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
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
          {tech_stack_images.map((image) => (
            <div key={image} className={image?.class}>
              <img src={image?.light || image.dark} className="dark:hidden" alt={`${image.name}_logo`} />
              <img src={image.dark} className="hidden dark:block" alt={`${image.name}_logo`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TechStack;