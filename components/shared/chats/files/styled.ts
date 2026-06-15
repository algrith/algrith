import tw, { styled } from 'twin.macro';
import { Modal } from 'antd';

export const DocumentPreviewModalWrapper = styled(Modal)`
  &.pad-body .ant-modal-body {
    ${tw`h-[calc(100dvh - 100px)] md:h-[calc(100dvh - 80px)] p-0 md:p-0 lg:p-0`};

    iframe {
      ${tw`h-full w-full border-none`};
    }
  }
`;

export const ImagePreviewWrapper = styled.div`
  ${tw`h-[calc(100vh - 40px)] flex justify-center flex-col gap-5`};

  .file-name {
    ${tw`hidden md:block`};
  }
  
  video {
    ${tw`max-h-full md:max-h-[calc(100% - 160px)]`};
  }
`;

export const ChatFilesWrapper = styled.div`
  ${tw`w-full flex flex-col gap-2 max-h-36 overflow-y-auto`};
  
  &.in-message {
    ${tw`max-h-64`};

    .file-wrapper .close-btn {
      ${tw`hidden`};
    }
  }
  
  .group {
    ${tw`w-full flex flex-col items-start gap-2`};

    h6 {
      ${tw`text-gray-400 dark:text-gray-300 font-semibold tracking-wide`};
    }

    .files {
      ${tw`w-full grid gap-1.5`};

      .file-wrapper {
        ${tw`relative`};

        .close-btn {
          ${tw`absolute top-1 right-1 p-0 w-5 h-5 z-1 text-white`};

          .ant-btn-icon {
            ${tw`flex justify-center items-center text-sm`};
          }
        }
      }

      &.image, &.video {
        ${tw`grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`};

        &.double-view {
          ${tw`lg:grid-cols-2`};

          .ant-image {
            ${tw`h-24`};
          }
        }
        
        &.single-view {
          ${tw`grid-cols-1`};

          .ant-image {
            ${tw`w-auto h-auto`};
          }
        }
      }

      &.document {
        ${tw`grid-cols-1 lg:grid-cols-2`};
      }
      
      .ant-image {
        ${tw`bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full h-16 mb-1.5 overflow-hidden`};

        img {
          ${tw`object-contain w-full h-full`};
        }
      }
    }
  }
`;

export const DocumentWrapper = styled.a`
  ${tw`relative justify-start bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-12 p-1 gap-1 mb-1.5 overflow-hidden`};
  display: flex!important;
  
  .details {
    ${tw`flex flex-grow flex-col justify-between items-start overflow-hidden`};

    span {
      ${tw`w-full text-left text-gray-500 dark:text-gray-300 text-xs overflow-ellipsis whitespace-nowrap overflow-hidden`};

      &:first-of-type {
        ${tw`text-theme-primary font-semibold text-xm`};
      }
    }
  }

  .file-icon-wrapper {
    ${tw`relative flex justify-center items-center rounded w-10 h-10`};

    .anticon {
      ${tw`text-3xl text-theme-text`};
    }
  }
`;

export const MaskWrapper = styled.div`
  ${tw`relative w-full h-full`};
  
  &.document-file {
    ${tw`absolute left-0 top-0 bg-black/40`};
  }

  .mime-type-icon {
    ${tw`absolute right-2 bottom-2 flex justify-center items-center text-white`};
  }
  
  .file-size {
    ${tw`absolute left-2 bottom-1.5 text-xs flex justify-center items-center rounded-full bg-gray-700 text-gray-300 px-2 py-0.5`};
  }
  
  .action {
    ${tw`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-1.5 text-white`};
    
    &.icon-only {
      ${tw`rounded-full bg-theme-secondary text-black px-2 py-1.5`};
    }
  }
  
  .anticon {
    ${tw`text-lg`};
  }
`;