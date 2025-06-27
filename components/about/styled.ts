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
      ${tw`flex flex-col text-justify`};
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
  ${tw`text-center py-10 lg:py-20 dark:bg-slate-900 bg-white`};

  h2 {
    ${tw`text-3xl md:text-5xl lg:text-6xl dark:text-theme-secondary font-extrabold tracking-wide leading-10 md:leading-[1.5] mb-3`};
  }
  
  p {
    ${tw`mt-4 mb-10 lg:max-w-4xl xl:max-w-6xl md:leading-[1.8] text-xl md:text-2xl font-montserrat dark:text-dark-mode-septenary text-gray-500 lg:mx-auto`};
  }
`;

export const ContactWrapper = styled(SectionLayout)`
  ${tw`md:py-12 lg:py-0`};

  .info {
    ${tw`text-center`};

    p {
      ${tw`mb-4 md:mb-8 py-10 text-xl text-gray-500`};
    }
  }
  
  .inner {
    ${tw`grid lg:grid-cols-4 w-full gap-10 lg:gap-8 mb-4 lg:mb-0`};
  }
`;

export const ContactInquiryCardWrapper = styled.div`
  ${tw`lg:order-1 w-full lg:mt-16`};

  .wrapper {
    ${tw`dark:bg-dark-mode-secondary overflow-hidden bg-white rounded-lg shadow`};

    .image-wrapper {
      ${tw`h-64`};

      .ant-avatar {
        ${tw`filter rounded-none dark:brightness-75 h-full w-full object-cover`};
      }
    }
    
    .content {
      ${tw`flex flex-col gap-4 p-6 items-end`};

      a {
        ${tw`w-fit h-14 lg:h-auto`};
      }
      
      p {
        ${tw`text-xl dark:text-dark-mode-septenary text-gray-600`};
      }
    }
  }
`;

export const ContactDetailsWrapper = styled.div`
  ${tw`lg:order-3 w-full lg:mt-16`};

  .top {
    ${tw`py-4 px-5 mb-4 dark:bg-opacity-50 bg-blue-500 rounded-lg shadow flex gap-4 justify-between items-center`};

    span {
      ${tw`dark:bg-opacity-50 bg-blue-400 rounded-lg`};
    }
    
    a {
      ${tw`px-2 text-white flex justify-center items-center rounded-xl text-2xl h-12 w-12 dark:bg-opacity-50 bg-blue-400 shadow-lg`};
    }
  }
   
  .email {
    ${tw`text-xl font-bold dark:text-dark-mode-septenary text-white py-2 px-3.5 dark:bg-opacity-50 bg-gray-400 rounded-lg shadow flex gap-4 justify-between items-center`};
  }
  
  span {
    ${tw`px-2 flex items-center justify-center w-12 h-12`};
    
    svg {
      ${tw`h-6 w-6`};
    }
  }
`;

export const ContactFormWrapper = styled.div`
  ${tw`lg:order-2 md:col-span-2 w-full -mt-24 md:-mt-32 lg:-mt-24`};

  form {
    ${tw`shadow rounded-2xl overflow-hidden`};

    .fields-wrapper {
      ${tw`px-6 py-5 xl:px-12 dark:bg-dark-mode-secondary bg-white space-y-6`};

      .grid-fields {
        ${tw`grid sm:grid-cols-2 gap-6`};
      }
    }
    
    .button-wrapper {
      ${tw`px-6 xl:px-12 pt-4 pb-7 xl:pb-12 dark:bg-dark-mode-secondary bg-gray-50`};
    }
  }
`;