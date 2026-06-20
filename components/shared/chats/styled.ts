import { squareWaves } from '../layout/styled';
import tw, { styled } from 'twin.macro';

export const ConversationWrapper = styled.h3`
  ${tw`flex items-center gap-2 text-xl lg:text-xm font-semibold tracking-wide overflow-hidden z-1`};

  &:not(.in-chat-header) {
    ${tw`gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-white dark:bg-gray-900/40 hover:dark:bg-gray-900/60 hover:shadow hover:dark:shadow-gray-700 cursor-pointer`};

    &:not(:last-of-type) {
      ${tw`border-b border-b-gray-100 dark:border-b-gray-700`};
    }
  }
  
  .ant-btn {
    ${tw`!p-0 h-auto leading-[1] !bg-transparent shadow-none text-gray-100 hover:text-white text-xm`};

    .anticon {
      ${tw`text-2xl`};
    }
  }
  
  .text {
    ${tw`w-full flex flex-col overflow-hidden`};
    
    .message {
      ${tw`flex gap-4 justify-between text-md w-full`};

      .last-message {
        ${tw`whitespace-nowrap overflow-ellipsis overflow-hidden`};
      }
    }
    
    .title {
      ${tw`w-full whitespace-nowrap overflow-ellipsis overflow-hidden capitalize`};
    }
  }
`;

export const MessageWrapper = styled.div`
  ${tw`flex w-full z-1`};

  &:last-of-type {
    ${tw`mb-10`};
  }
  
  &.sender {
    ${tw`justify-end`};

    .message {
      ${tw`rounded-br-3xl rounded-tr rounded-tl-xl rounded-bl-xl`};
    }
  }
  
  .message {
    ${tw`flex gap-3 w-4/5 rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-3xl p-1 bg-gray-100 text-gray-700 dark:bg-gray-900/70 dark:text-gray-300 shadow`};

    .ant-avatar .anticon {
      ${tw`font-semibold text-2xl`};
    }
    
    .details {
      ${tw`flex flex-col w-full gap-2`};

      .metadata {
        ${tw`flex gap-2 items-center justify-end w-full text-xs pr-1.5`};

        .delivered {
          ${tw`text-orange-500`};
        }
        
        .failed {
          ${tw`text-red-500`};
        }
        
        .read {
          ${tw`text-green-500`};
        }
      }
      
      .container {
        ${tw`w-full`};

        .text {
          ${tw`whitespace-pre-wrap p-1 leading-tight`};
        }
      }
      
      h3 {
        ${tw`text-xm font-semibold tracking-wide flex-grow whitespace-nowrap overflow-ellipsis`};
      }
    }
  }
`;

export const ChatsWrapper = styled.div`
  ${tw`!fixed z-[21] w-full md:w-96 rounded-t-xl -bottom-full md:-bottom-112 left-0 md:left-auto md:right-8 bg-white dark:bg-gray-900 shadow-lg transition-all duration-500`};
  ${squareWaves()};
  
  &.loading .conversations {
    ${tw`flex justify-center items-center`};
  }
  
  &.show {
    ${tw`bottom-0`};
  }
  
  .header {
    ${tw`w-full h-[50px] text-xl relative flex gap-4 justify-between items-center px-5 py-3 rounded-t-xl text-white bg-theme-primary font-semibold cursor-pointer`};
    
    .controls {
      ${tw`flex gap-3 items-center`};
      
      .ant-btn {
        ${tw`flex-grow !p-0 h-auto !bg-transparent shadow-none text-gray-100 hover:text-white text-xm`};
        
        .anticon {
          ${tw`text-xl lg:text-lg`};
        }
        
        &:first-of-type .anticon {
          ${tw`text-xl flex items-center -mt-0.5`};
        }
      }
    }
  }
  
  .conversations {
    ${tw`w-full h-112 !overflow-y-auto overscroll-contain`};
  }
`;

export const ChatWrapper = styled.div`
  ${tw`w-full h-full flex flex-col gap-1`};

  &.loading .messages {
    ${tw`items-center justify-center`};
  }

  .messages {
    ${tw`flex flex-col gap-3 w-full h-full p-4 overflow-y-auto overscroll-contain`};
  }
  
  .input {
    ${tw`relative flex flex-col gap-2 w-full p-3 pt-1 z-1`};

    .order-delivery {
      ${tw`flex gap-3 items-center justify-end w-full dark:text-gray-300`};
    }

    &.has-files {
      ${tw`rounded-xl bg-white dark:bg-gray-900`};
    }

    .controls {
      ${tw`flex items-end gap-2 w-full`};

      textarea {
        ${tw`!min-h-14 lg:!min-h-10 max-h-[150px] pt-3 lg:pt-1`};
      }

      .ant-btn {
        ${tw`flex items-center justify-center w-14 lg:w-10 h-14 lg:h-10 bg-theme-primary/20 hover:bg-theme-primary/30`};

        .ant-btn-icon {
          ${tw`flex items-center justify-center w-full h-full`};
        }
        
        .anticon {
          ${tw`text-2xl text-theme-primary`};
        }
      }
    }
  }
`;