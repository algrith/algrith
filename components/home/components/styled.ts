import { SectionLayout } from '@/components/shared/layout/styled';
import tw, { styled } from 'twin.macro';

export const MissionStatementWrapper = styled(SectionLayout)`
  ${tw`flex flex-col md:flex-row justify-between gap-8 lg:gap-28 xl:gap-32 pt-10 md:pt-16 lg:pt-24 py-24 bg-white dark:bg-dark-mode-secondary`};

  .left {
    ${tw`lg:w-3/4`};

    h1 {
      ${tw`text-4xl font-semibold text-sky-700 dark:text-teal-600 leading-tight sm:leading-tight sm:text-7xl`};
    }
    
    p {
      ${tw`mt-4 mb-8 leading-relaxed text-2xl md:leading-relaxed dark:text-dark-mode-septenary text-gray-600`};

      span {
        ${tw`hidden lg:inline`};
      }
    }
  }
  
  .right {
    ${tw`md:max-w-lg`};

    .ant-avatar {
      ${tw`rounded-3xl filter dark:brightness-75 w-full h-auto object-center object-contain`};
    }
  }
`;

export const SessionBookingWrapper = styled(SectionLayout)`
  ${tw`md:flex justify-between overflow-hidden bg-white pt-10 md:pt-16 lg:pt-24 py-24 dark:bg-dark-mode-secondary`};

  .right {
    ${tw`sm:max-w-lg mt-12 md:mt-0 overflow-hidden`};

    .ant-avatar {
      ${tw`filter dark:brightness-75 w-full h-full object-center object-cover rounded-3xl`};
    }
  }
  
  .left {
    ${tw`md:pr-6 lg:pr-28 xl:pr-32`};

    h1 {
      ${tw`text-2xl font-semibold leading-tight sm:leading-tight`};
    }
    
    p {
      ${tw`mt-4 mb-8 leading-relaxed text-2xl md:leading-relaxed dark:text-dark-mode-septenary text-gray-600`};
    }
  }
`;

export const GetStartedWrapper = styled(SectionLayout)`
  ${tw`mt-8 mb-24`};
  
  .shadow-wrapper {
    ${tw`w-full px-4 py-6 md:p-6 lg:p-8 rounded-3xl shadow-lg dark:bg-dark-mode-primary bg-white md:flex justify-between items-start`};
  }
  
  .left {
    ${tw`sm:max-w-2xl px-2`};
  }
  
  h1 {
    ${tw`leading-tight text-4xl font-extrabold tracking-wide dark:text-theme-primary text-gray-900 sm:leading-tight sm:text-6xl`};
  }
  
  p {
    ${tw`mt-4 mb-8 text-2xl leading-relaxed md:leading-relaxed dark:text-dark-mode-septenary text-gray-500`};

    span {
      ${tw`hidden lg:inline`};
    }
  }
  
  a svg {
    ${tw`inline h-6 w-6`};
  }
  
  .right {
    ${tw`sm:max-w-2xl mt-8 md:mt-0 overflow-hidden`};

    .ant-avatar {
      ${tw`filter dark:brightness-75 w-full h-full object-contain lg:object-cover rounded-3xl`};
    }
  }
`;

export const TechStackWrapper = styled(SectionLayout)`
  ${tw`dark:bg-dark-mode-secondary bg-theme-secondary/10 pt-8 lg:pt-12 pb-10 lg:pb-14`};

  .intro {
    ${tw`w-full md:w-3/4 mx-auto sm:mb-6`};

    h1 {
      ${tw`text-3xl md:text-4xl font-nunito-sans text-center text-theme-secondary font-extrabold pt-4`};
    }
  }
  
  .carousel-item-class {
    ${tw`flex items-center md:px-12 px-6 justify-center`};

    .scikit-learn {
      ${tw`scale-45 md:scale-65`};
    }
    
    .javascript {
      ${tw`scale-45 md:scale-65`};
    }
    
    .bootstrap {
      ${tw`scale-45 md:scale-65`};
    }
    
    .mysql {
      ${tw`md:scale-75`};
    }
      
    .bash {
      ${tw`md:scale-65`};
    }
    
    .php {
      ${tw`scale-65 md:scale-75`};
    }

    .ant-avatar {
      ${tw`w-auto h-full rounded-none`};
    }

    .light {
      ${tw`dark:hidden`};
    }
    
    .dark {
      ${tw`hidden dark:block`};
    }
  }
`;

export const WhoWeAreWrapper = styled(SectionLayout)`
  ${tw`text-center py-10 lg:py-20 dark:bg-slate-900 bg-white`};

  h2 {
    ${tw`text-3xl md:text-5xl dark:text-theme-secondary text-theme-primary font-extrabold tracking-wide leading-10 md:leading-[54px] uppercase mb-8`};
  }
  
  p {
    ${tw`mt-4 mb-10 lg:max-w-4xl xl:max-w-6xl leading-9 text-xl md:text-2xl font-montserrat dark:text-dark-mode-septenary text-gray-500 lg:mx-auto`};
  }
`;

export const ReviewCardWrapper = styled.figure`
  ${tw`flex flex-col 2xl:flex-row justify-center items-center 2xl:items-start gap-6 bg-slate-100 dark:bg-dark-mode-secondary rounded-xl w-full p-8`};

  .content {
    ${tw`text-center xl:text-left space-y-4`};

    blockquote p {
      ${tw`text-xl dark:text-dark-mode-septenary text-gray-500`};
    }
    
    figcaption {
      ${tw`font-medium`};
      
      .designation {
        ${tw`text-slate-700 dark:text-dark-mode-quinary`};
      }
      
      .name {
        ${tw`text-2xl text-sky-700 dark:text-theme-primary`};
      }
    }
  }
  
  .ant-avatar {
    ${tw`w-24 h-24`};
  }
`;

export const PingAnimationWrapper = styled.div`
  ${tw`w-8 w-8 absolute bg-green-600 -top-2 -left-2 md:-left-1 flex items-center justify-center -z-10`};
  
  .animator {
    ${tw`h-8 w-8 absolute top-0 rounded-full pointer-events-none`};
    
    .background {
      ${tw`h-full w-full animate-ping border border-theme-secondary rounded-full`};
    }
  }
`;

export const WelcomeIntroWrapper = styled.div`
  ${tw`relative w-full h-auto lg:h-188 bg-intro-index bg-right-top md:bg-left-top bg-cover bg-scroll lg:bg-fixed bg-no-repeat`};
  
  .inner {
    ${tw`bg-theme-primary/80 dark:bg-dark-mode-primary/90 h-full w-full mx-auto flex justify-between items-center px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-144 py-16`};

    .right {
      ${tw`hidden lg:block w-4/12 xl:w-5/12`};
    }

    .left {
      ${tw`relative w-full lg:w-3/5`};
    }
  }

  .typing-pad {
    ${tw`w-full font-bold leading-tight md:leading-tight lg:leading-tight dark:text-dark-mode-octonary text-white text-5xl lg:text-7xl 2xl:text-8xl`};
  }

  .description {
    ${tw`text-left block mt-4 mb-10 md:mb-16 text-theme-secondary tracking-wide text-2xl font-semibold lg:text-3xl`};
  }
`;