import tw, { styled } from 'twin.macro';

import { SectionLayout } from '../shared/layout/styled';

export const RefundPolicyWrapper = styled(SectionLayout)`
  ${tw`dark:text-slate-200 text-gray-600 pt-8 md:pt-12 pb-8 md:pb-16`};

  .intro {
    ${tw`py-2`};

    h1 {
      ${tw`mb-4 md:mb-8 text-3xl md:text-5xl font-bold`};

      span {
        ${tw`text-theme-secondary text-lg flex mb-2`};
      }
    }
    
    p {
      ${tw`text-xl leading-relaxed text-justify mb-4 md:mb-12`};
    }
  }
  
  .content {
    ${tw`relative grid md:grid-cols-3 gap-8`};

    .policies {
      ${tw`md:col-span-2 relative flex flex-col gap-8 dark:bg-dark-mode-secondary bg-white leading-relaxed shadow-sm rounded-2xl text-xl p-4 md:p-10 text-justify`};

      h1, h2 {
        ${tw`text-left mb-8 text-theme-secondary text-3xl font-bold`};
      }
      
      .sub-policy {
        ${tw`mt-4 pl-4`};

        h2 {
          ${tw`text-2xl mb-4`};
        }
      }
      
      ul {
        ${tw`pl-4 my-8`};

        &.list-decimal {
          ${tw`list-decimal`};
        }
      
        li span {
          ${tw`text-theme-secondary`};
        }
        
        ul {
          ${tw`pl-4 list-disc`};
        }
      }
    }
    
    .table-of-content {
      ${tw`hidden md:block`};
      
      .sticky {
        ${tw`sticky top-16 flex flex-col gap-4`};
      
        h2 {
          ${tw`text-2xl md:text-3xl font-bold`};
        }
        
        ul {
          ${tw`flex flex-col gap-2`};

          li {
            ${tw`cursor-pointer`};
          }
        }
      }
    }
  }
`;