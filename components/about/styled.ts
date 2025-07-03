'use client';

import { SectionLayout } from '@/components/shared/layout/styled';
import tw, { styled } from 'twin.macro';

export const OurValuesWrapper = styled(SectionLayout)`
  ${tw`text-center py-10 lg:py-20 dark:bg-slate-900 bg-white flex flex-col gap-8`};

  h2 {
    ${tw`text-3xl md:text-5xl lg:text-6xl dark:text-theme-secondary font-extrabold tracking-wide leading-10 md:leading-[1.5] mb-4`};
  }
  
  .value-wrapper {
    ${tw`grid md:grid-cols-2 gap-8 lg:gap-16 justify-between text-justify mt-4 mb-10 md:leading-[1.8] text-xl md:text-2xl font-montserrat dark:text-dark-mode-septenary text-gray-500`};
    
    .image {
      ${tw`flex`};
      
      .ant-avatar {
        ${tw`w-full h-full md:w-96 md:h-96 lg:w-144 lg:h-144 xl:h-auto xl:w-4/5 filter dark:brightness-75 transition-all ease-in-out hover:scale-[95%]`};
        
        img {
          ${tw`object-contain h-auto`};
        }
      }
    }
    
    .text {
      ${tw`flex flex-col text-justify leading-10`};
    }
    
    &:nth-of-type(1) {
      .image {
        ${tw` order-2 md:order-1`};
      }
      
      .text {
        ${tw`order-1 md:order-2`};
      }
    }
    
    &:nth-of-type(2) {
      .image {
        ${tw`justify-end`};
      }
      
      .text {
        ${tw`justify-end`};
      }
    }
  }
`;

export const GetStartedWrapper = styled(SectionLayout)`
  ${tw`text-center pt-10 pb-28 lg:pt-20 dark:bg-slate-900 bg-white`};

  h2 {
    ${tw`text-3xl md:text-5xl lg:text-6xl dark:text-theme-secondary font-extrabold tracking-wide leading-10 md:leading-[1.5] mb-3`};
  }
  
  p {
    ${tw`mt-4 mb-10 lg:max-w-4xl xl:max-w-6xl md:leading-[1.8] text-xl md:text-2xl font-montserrat dark:text-dark-mode-septenary text-gray-500 lg:mx-auto`};
  }
`;