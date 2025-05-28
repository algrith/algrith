import tw, { css, styled } from 'twin.macro';

import { SectionLayout } from '../shared/layout/styled';

const DarkTextStyles = css`
  &.yellow {
    ${tw`dark:text-yellow-100`};
  }
  
  &.green {
    ${tw`dark:text-green-100`};
  }
  
  &.blue {
    ${tw`dark:text-blue-100`};
  }
  
  &.pink {
    ${tw`dark:text-pink-100`};
  }
  
  &.teal {
    ${tw`dark:text-teal-100`};
  }
  
  &.rose {
    ${tw`dark:text-rose-100`};
  }
  
  &.red {
    ${tw`dark:text-red-100`};
  }
`;

const BorderStyles = css`
  &.yellow {
    ${tw`border-yellow-500`};
  }

  &.green {
    ${tw`border-green-500`};
  }

  &.blue {
    ${tw`border-blue-500`};
  }

  &.pink {
    ${tw`border-pink-500`};
  }

  &.teal {
    ${tw`border-teal-500`};
  }

  &.rose {
    ${tw`border-rose-500`};
  }

  &.red {
    ${tw`border-red-500`};
  }
`;

const DarkBgStyles = css`
  &.yellow {
    ${tw`dark:bg-yellow-900 bg-yellow-50`};
  }
  
  &.green {
    ${tw`dark:bg-green-900 bg-green-50`};
  }
  
  &.blue {
    ${tw`dark:bg-blue-900 bg-blue-50`};
  }
  
  &.pink {
    ${tw`dark:bg-pink-900 bg-pink-50`};
  }
  
  &.teal {
    ${tw`dark:bg-teal-900 bg-teal-50`};
  }
  
  &.rose {
    ${tw`dark:bg-rose-900 bg-rose-50`};
  }
  
  &.red {
    ${tw`dark:bg-red-900 bg-red-50`};
  }
`;

const TextStyles = css`
  &.yellow {
    ${tw`text-yellow-500`};
  }
  
  &.green {
    ${tw`text-green-500`};
  }
  
  &.blue {
    ${tw`text-blue-500`};
  }
  
  &.pink {
    ${tw`text-pink-500`};
  }
  
  &.teal {
    ${tw`text-teal-500`};
  }
  
  &.rose {
    ${tw`text-rose-500`};
  }
  
  &.red {
    ${tw`text-red-500`};
  }
`;

const BgStyles = css`
  &.yellow {
    ${tw`bg-yellow-500`};
  }
  
  &.green {
    ${tw`bg-green-500`};
  }
  
  &.blue {
    ${tw`bg-blue-500`};
  }
  
  &.pink {
    ${tw`bg-pink-500`};
  }
  
  &.teal {
    ${tw`bg-teal-500`};
  }
  
  &.rose {
    ${tw`bg-rose-500`};
  }
  
  &.red {
    ${tw`bg-red-500`};
  }
`;

export const HowItWorksWrapper = styled(SectionLayout)`
  ${tw`text-gray-500 py-12`};

  .title {
    ${tw`text-center py-2`};

    h1 {
      ${tw`mb-8 text-3xl md:text-5xl dark:text-slate-200 font-bold`};
    }
    
    p {
      ${tw`leading-relaxed dark:text-slate-300 text-lg md:text-xl md:leading-relaxed mb-12`};
    }
  }
  
  .content {
    ${tw`grid xl:grid-cols-3 gap-8 md:gap-12 w-full`};

    .steps {
      ${tw`xl:col-span-2 text-xl`};

      .get-started {
        h2 {
          ${tw`mb-4 dark:text-dark-mode-senary text-lg md:text-xl font-bold`};
        }
        
        p {
          ${tw`leading-relaxed dark:text-dark-mode-senary text-lg md:text-xl md:leading-relaxed mb-8`};
        }
      }
    }
    
    .aims {
      ${tw`grid md:grid-cols-2 xl:grid-cols-1 self-start gap-8 dark:text-dark-mode-senary`};

      .item {
        ${tw`rounded-2xl border border-gray-100 dark:border-dark-mode-secondary dark:bg-dark-mode-secondary bg-white p-6 md:p-8`};

        h2 {
          ${tw`mb-4 text-2xl dark:text-theme-primary font-bold`};
        }
        
        p {
          ${tw`leading-relaxed text-lg md:text-xl md:leading-relaxed mb-8`};
        }
        
        img {
          ${tw`filter dark:brightness-75 object-cover object-center rounded-lg transition-all ease-in-out hover:scale-[95%]`};
        }
      }
    }
  }
`;

export const StepIconWrapper = styled.div`
  ${tw`absolute dark:brightness-75 top-14 border-t-4 pointer-events-none w-32 border-r-4 rounded-tr-3xl right-5.5 md:right-9 h-full`};
  ${BorderStyles};

  &.first .ping-wrapper {
    ${tw`-top-14`};
  }
  
  &.left {
    ${tw`border-l-4 border-r-0 rounded-tl-3xl left-5.5 md:left-9`};

    .ping-wrapper {
      ${tw`-left-[1.125rem]`};
      
      .ping.first {
        ${tw`left-[0.225rem]`};
      }
    }
    
    .line.first {
      ${tw`-left-1`};
    }
  }
  
  &.last {
    ${tw`h-12 md:h-20`};
  }

  .ping-wrapper {
    ${tw`h-8 w-8 absolute z-[11] border-inherit rounded-full pointer-events-none -right-[1.125rem] bottom-10`};
    
    .ping {
      ${tw`h-full w-full border-inherit animate-ping border rounded-full`};

      &.first {
        ${tw`h-6 w-6 absolute top-1 bg-white rounded-full right-[0.225rem]`};
      }
    }
    
    ${BgStyles};
  }

  .line.first {
    ${tw`h-20 w-1 -top-14 absolute bg-red-500 pointer-events-none -right-1`};
  }
`;

export const ContentWrapper = styled.div`
  ${tw`w-11/12 z-10 pr-6`};

  &.left {
    ${tw`pl-6 pr-0`};
  }

  .inner {
    ${tw`dark:brightness-75 shadow-sm p-8 rounded-3xl`};
    ${DarkBgStyles};
    
    h2 {
      &.step {
        ${tw`text-gray-900 font-bold text-2xl mb-2 tracking-wider`};
        ${DarkTextStyles};
      }
      
      &.title {
        ${tw`font-bold text-xl mb-4 tracking-wider text-left`};
        ${TextStyles};
      }
    }

    p {
      ${tw`leading-relaxed text-lg md:text-xl dark:text-slate-300 md:leading-relaxed md:text-justify`};
    }
  }
`;

export const StepWrapper = styled.div`
  ${tw`flex justify-between relative pb-16 transition-all ease-in-out hover:scale-[103%]`};

  &.left {
    ${tw`justify-end`};
  }
`;

export const IconWrapper = styled.div`
  ${tw`dark:brightness-75 h-full flex flex-col justify-between absolute right-0 items-end`};
  
  &.left {
    ${tw`left-0`};
  }
`;

export const SvgWrapper = styled.div`
  ${tw`flex items-center justify-center text-white absolute right-0 z-10 mt-20 w-12 h-12 md:w-20 md:h-20 rounded-full`};
  ${BgStyles};

  &.left {
    ${tw`left-0`};
  }
  
  svg {
    ${tw`h-8 w-8 md:h-12 md:w-12`};
  }
`;