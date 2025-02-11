import { SectionLayout } from '@/components/shared/layout/styled';
import tw, { styled } from 'twin.macro';

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
      ${tw`px-8 py-8`};

      .link {
        ${tw`md:text-right`};
      }
      
      h3 {
        ${tw`mb-8 lg:mb-4 text-lg dark:text-dark-mode-septenary text-gray-600 font-semibold`};
      }
    }
  }
`;

export const ContactDetailsWrapper = styled.div`
  ${tw`lg:order-3 w-full lg:mt-16`};

  .top {
    ${tw`py-4 px-6 mb-4 dark:bg-opacity-50 bg-blue-500 rounded-lg shadow flex gap-4 justify-between items-center`};

    span {
      ${tw`dark:bg-opacity-50 bg-blue-400 rounded-lg`};
    }
    
    a {
      ${tw`px-2 text-white flex justify-center items-center rounded-xl text-2xl h-12 w-12 dark:bg-opacity-50 bg-blue-400 shadow-lg`};
    }
  }
   
  .bottom {
    ${tw`py-4 px-6 dark:bg-opacity-50 bg-gray-400 rounded-lg shadow flex gap-4 items-center`};

    span {
      ${tw`bg-gray-500 rounded-lg shadow-lg`};
    }

    p {
      ${tw`text-lg font-bold dark:text-dark-mode-septenary text-white`};
    }
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
    ${tw`shadow rounded-md overflow-hidden`};

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