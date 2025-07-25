import tw, { styled } from 'twin.macro';

import { SectionLayout } from '../shared/layout/styled';

export const TermsOfServiceWrapper = styled(SectionLayout)`
  ${tw`dark:text-slate-200 text-gray-600 pt-8 md:pt-12 pb-8 md:pb-16`};

  .intro {
    ${tw`py-2`};

    h1 {
      ${tw`mb-4 md:mb-8 text-3xl md:text-5xl font-bold`};

      span {
        ${tw`text-pink-500 text-lg flex mb-2`};
      }
    }
    
    p {
      ${tw`text-xl leading-relaxed text-justify mb-4 md:mb-12`};
    }
  }
  
  .content {
    ${tw`grid md:grid-cols-3 gap-8`};

    .terms {
      ${tw`md:col-span-2 relative flex flex-col gap-8 dark:bg-dark-mode-secondary bg-white leading-relaxed shadow-sm rounded-2xl text-xl p-4 md:p-10 text-justify`};

      h1 {
        ${tw`text-left mb-8 text-pink-500 text-3xl font-bold`};
      }
      
      ul {
        ${tw`pl-4 md:pl-8 my-8 marker:text-pink-500`};

        &.list-lower-roman {
          ${tw`list-[lower-roman]`};
        }
        
        &.list-lower-alpha {
          ${tw`list-[lower-alpha]`};
        }
      }
      
      p {
        ${tw`mb-4`};

        span {
          ${tw`text-pink-500`};
        }
      }
    }
  }
`;