import tw, { styled } from 'twin.macro';

import { borderCss, ModalWrapper } from '@/components/shared/layout/styled';

export const OrdersModalWrapper = styled(ModalWrapper)`
  .ant-modal-body .content {
    ${tw`gap-0 rounded-xl pt-0 mt-4 h-96 w-full overflow-x-hidden`};
    ${borderCss};
    
    .item {
      ${tw`flex capitalize px-4 py-1 shadow-none justify-between rounded-none text-xm hover:bg-gray-900/70`};
      
      &:not(:last-of-type) {
        ${tw`border-b border-b-gray-100 dark:border-b-gray-700`};
      }
      
      &:nth-of-type(:even) {
        ${tw`bg-gray-900/50 `};
      }
    }
  }
`;