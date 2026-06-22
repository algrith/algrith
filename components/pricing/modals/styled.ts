import tw, { styled } from 'twin.macro';

import { ModalWrapper } from '@/components/shared/layout/styled';

export const PaymentModalWrapper = styled(ModalWrapper)`
  .ant-modal-body .content {
    &.requirements h2 {
      ${tw`mb-3`};
    }
    
    .footer {
      ${tw`flex flex-wrap justify-end gap-4 sticky bottom-0 pt-4 bg-white dark:bg-transparent backdrop-blur-lg`};
    }
    
    .coupon-code {
      ${tw`flex gap-4 justify-between items-center`};

      .ant-btn {
        ${tw`border-2 border-theme-primary text-theme-primary hover:(bg-theme-primary text-white)`};
      }
    }

    .breakdown {
      ${tw`flex flex-col gap-2`};

      li {
        ${tw`flex justify-between`};

        span:last-of-type {
          ${tw`tracking-wide font-mono`};
        }
      }
    }

    .plan {
      ${tw`flex flex-col gap-1`};
    }
  }
  
  .items {
    ${tw`flex flex-col gap-6`};

    &.row {
      ${tw`md:flex-row`};
    }
  }
  
  h2 {
    ${tw`text-gray-700 dark:text-gray-300 text-xl tracking-widest`};
    
    &.total, &.addons {
      ${tw`flex justify-between items-center gap-2 border-t border-b border-gray-300 dark:border-gray-500 py-3 tracking-widest`};
      
      span:last-of-type {
        ${tw`tracking-wide font-mono`};
      }
    }
    
    &.addons {
      ${tw`text-lg`};
    }
  }
`;