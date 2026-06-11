import tw, { styled } from 'twin.macro';

export const ConversationWrapper = styled.div`
  ${tw`flex gap-3 p-4 text-gray-700 dark:text-gray-300 dark:bg-gray-900 cursor-pointer`};

  &:not(:last-of-type) {
    ${tw`border-b border-b-gray-100 dark:border-b-gray-700`};
  }

  .ant-avatar {
    ${tw`shadow mt-1`};

    .anticon {
      ${tw`font-semibold text-2xl`};
    }
  }
  
  .details {
    ${tw`flex flex-col w-full`};

    .message {
      ${tw`w-full whitespace-nowrap overflow-ellipsis`};
    }
    
    h3 {
      ${tw`text-xm font-semibold tracking-wide flex-grow whitespace-nowrap overflow-ellipsis`};
    }
  }
`;

export const MessageWrapper = styled.div`
  ${tw`flex w-full`};
  
  &.sender {
    ${tw`justify-end`};

    .message {
      ${tw`rounded-br-3xl rounded-tr rounded-tl-xl rounded-bl-xl pr-4`};
    }
  }
  
  .message {
    ${tw`flex gap-3 w-4/5 rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-3xl px-3 py-2 bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300`};

    .ant-avatar .anticon {
      ${tw`font-semibold text-2xl`};
    }
    
    .details {
      ${tw`flex flex-col w-full`};

      .metadata {
        ${tw`flex flex-row items-center justify-end w-full text-xs`};

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
      
      .text {
        ${tw`w-full whitespace-pre`};
      }
      
      h3 {
        ${tw`text-xm font-semibold tracking-wide flex-grow whitespace-nowrap overflow-ellipsis`};
      }
    }
  }
`;

export const ChatsWrapper = styled.div`
  ${tw`fixed w-20 -bottom-112 md:right-8 md:w-96 transition-all bg-transparent shadow-lg`};
  
  &.show {
    ${tw`w-[calc(100% - 4rem)] md:w-96 bottom-0`};

    .header .ant-badge .ant-badge-count {
      ${tw`relative top-0 right-0`};
    }
  }

  .header {
    ${tw`relative flex gap-4 justify-between items-center px-5 py-3 rounded-t-xl text-white bg-theme-primary font-semibold cursor-pointer`};

    .ant-badge .ant-badge-count {
      ${tw`absolute -top-8 -right-3 md:relative md:top-0 md:right-0 shadow-none`};
    }
    
    .ant-btn {
      ${tw`!p-0 h-auto !bg-transparent shadow-none text-gray-100 hover:text-white text-xm`};
    }
  }
  
  .conversations {
    ${tw`flex flex-col h-112 bg-white dark:bg-black`};
  }
`;

export const EmptyWrapper = styled.div`
  ${tw`w-full h-full justify-center flex flex-col gap-2 items-center p-4`};

  p {
    ${tw`text-center`};
  }
`;

export const ChatWrapper = styled.div`
  ${tw`w-full h-full flex flex-col gap-1`};

  &.loading .messages {
    ${tw`items-center justify-center`};
  }

  .messages {
    ${tw`flex flex-col gap-3 w-full h-full p-4 overflow-y-auto`};
  }
  
  .input {
    ${tw`flex items-center gap-2 w-full p-3`};

    .ant-btn {
      ${tw`flex items-center justify-center w-10 h-10 bg-theme-primary/20 hover:bg-theme-primary/30`};

      .ant-btn-icon {
        ${tw`flex items-center justify-center w-full h-full`};
      }
      
      .anticon {
        ${tw`text-2xl text-theme-primary`};
      }
    }
  }
`;