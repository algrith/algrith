import tw, { styled } from 'twin.macro';

export const TableOfContentWrapper = styled.div`
  .content-wrapper {
    ${tw`px-6 pt-8 md:py-12 left-0 flex flex-col gap-4 bg-white dark:bg-dark-mode-secondary -bottom-full md:bottom-0 w-full md:w-auto h-[50vh] md:h-auto fixed md:sticky md:top-20 rounded-t-2xl rounded-b-none md:rounded-2xl transition-all duration-300 ease-in-out`};

    &.show {
      ${tw`bottom-0 z-[21]`};
    }
    
    h2 {
      ${tw`text-2xl md:text-3xl font-bold`};
    }
    
    ul {
      ${tw`flex flex-col gap-2`};

      li {
        ${tw`cursor-pointer`};

        a {
          ${tw`font-medium tracking-wide`};
          
          &.active {
            ${tw`text-theme-primary`};
          }
        }
      }
    }
  }
  
  .ant-btn.toggler {
    ${tw`md:hidden fixed bottom-8 right-12 z-10`};

    &.offset {
      ${tw`right-32`};
    }
    
    .anticon {
      ${tw`text-3xl`};
    }
  }
`;