import tw, { styled } from 'twin.macro';

import { darkBgGradient, SectionLayout, squareWaves } from '../shared/layout/styled';


export const PricingWrapper = styled(SectionLayout)`
  ${tw`w-full flex flex-col gap-16 pt-32 pb-16 z-1`};

  .title {
    ${tw`text-center`};

    h1 {
      ${tw`capitalize leading-tight sm:leading-tight font-extrabold tracking-widest dark:text-gray-200 text-gray-700 mb-8 text-5xl font-bold`};
    }
    
    p {
      ${tw`dark:text-slate-300 text-2xl`};
    }
  }
  
  .content {
    ${tw`w-full flex flex-col gap-16`};
  }
`;

export const AddonsWrapper = styled.div`
  ${tw`w-full md:w-3/5 mx-auto flex flex-col gap-8`};

  &.in-modal {
    ${tw`md:w-full`};
  }

  h1 {
    ${tw`w-full text-2xl font-bold text-gray-700 dark:text-slate-300`};
  }
  
  ul {
    ${tw`w-full flex flex-col gap-3`};

    li {
      ${tw`flex justify-between gap-2 cursor-pointer border-b pb-3 dark:text-slate-300`};

      :first-of-type {
        ${tw`font-semibold border-b-2 border-b-gray-300 text-gray-500`};
      }

      &:not(:first-of-type) > span:last-of-type {
        ${tw`font-bold text-gray-600 dark:text-theme-secondary`};
      }
      
      &:first-of-type > span {
        ${tw`text-xl font-bold text-gray-800 dark:text-theme-secondary`};
      }
      
      span {
        ${tw`px-2 py-1 tracking-widest`};

        :last-of-type {
          ${tw`whitespace-nowrap`};
        }
        
        &.selected {
          ${tw`bg-theme-primary rounded-full !text-white text-sm flex items-center gap-1 h-8 pl-1`};
        }
      }
    }
  }
  
  .actions {
    ${tw`flex justify-end gap-4 items-center`};
  }
`;

export const PlansWrapper = styled.div`
  ${tw`w-full flex flex-col items-center gap-8 lg:gap-16`};

  h1 {
    ${tw`relative mx-auto w-full text-center text-3xl capitalize leading-tight sm:leading-tight font-extrabold tracking-widest text-gray-500 dark:text-white`};
  }
  
  .plans {
    ${tw`w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8`};
    
    .plan {
      ${tw`flex flex-col gap-8 border dark:border-[#272f16] rounded-xl p-8 dark:backdrop-blur-sm shadow`};
      ${darkBgGradient.fourLayers};
      ${squareWaves(true)};

      .metadata {
        ${tw`flex flex-col gap-8`};
        
        .description {
          ${tw`text-sm font-semibold text-gray-500 dark:text-gray-300 tracking-wide`};
        }
        
        .price {
          ${tw`flex flex-col`};
          
          .amount {
            ${tw`text-3xl text-gray-600 dark:text-white font-bold tracking-widest`};
          }
          
          .tag {
            ${tw`text-gray-400 font-normal`};
          }
        }
        
        .name {
          ${tw`text-3xl text-theme-primary dark:text-white font-extrabold mb-2 tracking-widest`};

          .ant-tag {
            ${tw`-mt-0.5 ml-3 rounded-full tracking-wide`};
          }
        }
      }
      
      ul {
        ${tw`flex-grow flex flex-col gap-3`};

        li {
          ${tw`flex gap-4 items-start font-semibold text-gray-500 dark:text-gray-300 tracking-wide`};
          
          svg {
            ${tw`w-5 text-theme-primary mt-0.5`};
          }
        }
      }
    }
  }
`;