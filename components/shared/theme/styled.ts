import tw, { styled } from 'twin.macro';

export const SystemThemeIconWrapper = styled.svg`
  path {
    ${tw`fill-theme-primary/20 stroke-theme-primary`};
  }
`;

export const LightThemeIconWrapper = styled.svg`
  path {
    ${tw`fill-theme-primary/20 stroke-theme-primary`};
  }
`;

export const DarkThemeIconWrapper = styled.svg`
  path {
    ${tw`fill-theme-primary/20`};

    :not(:first-of-type) {
      ${tw`fill-theme-primary`};
    }
  }
`;

export const ThemeWrapper = styled.div`
  ${tw`z-20 md:bg-transparent fixed top-[1.0rem] right-16 md:right-24 lg:right-16 xl:right-24 2xl:right-144 mr-1 2xl:mr-4 flex items-center w-auto transition-all z-50 ease-in-out duration-500`};

  &.scrolled {
    ${tw`top-[0.25rem]`};
  }
  
  .inner {
    ${tw`flex items-center dark:bg-dark-mode-secondary bg-theme-primary/10 px-2 rounded-lg py-1`};

    svg {
      ${tw`w-8 h-8`};
    }
    
    .light {
      ${tw`dark:hidden`};
    }
    
    .dark {
      ${tw`hidden dark:inline`};
    }
  }
  
  ul.dropdown-wrapper {
    ${tw`absolute z-50 top-16 right-0 bg-white rounded-lg ring-1 ring-theme-primary/10 shadow-lg overflow-hidden w-40 text-lg text-slate-700 dark:text-dark-mode-octonary dark:bg-dark-mode-secondary dark:ring-0`};

    li {
      ${tw`py-3 px-3 flex gap-4 items-center cursor-pointer`};
      
      svg {
        ${tw`w-6 h-6`};
      }

      &.active {
        ${tw`bg-theme-primary/10 dark:bg-theme-primary/30`};
      }
    }
  }
`;