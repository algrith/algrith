'use client';

import tw, { styled } from 'twin.macro';

import { SiderWrapper } from '@/components/shared/layout/styled';

export const DashboardSiderWrapper = styled(SiderWrapper)`
  ${tw`py-8 pl-4 h-full`};
  
  @media (max-width: 768px) {
    ${tw`left-0 py-0 pl-0`};
  }

  .container {
    ${tw`py-6 flex flex-col gap-4 justify-between h-full backdrop-blur rounded-xl border border-gray-400/50 dark:border-gray-500/50`};

    .body {
      ${tw`flex flex-col overflow-y-auto flex-grow`};

      .tab-button {
        ${tw`text-[14px] mb-1 shadow-none rounded border-none`};
        
        span:not(.ant-btn-icon) {
          ${tw`line-clamp-1 overflow-ellipsis text-xl`};
        }
      }
    }
    
    .footer {
      ${tw`flex flex-col gap-4`};

      .ant-btn {
        ${tw`bg-transparent shadow-none`};
      }
    }
    
    @media (max-width: 768px) {
      ${tw`rounded-none border-0 border-r-[1px] dark:border-0 dark:border-r-[1px]`};

      .tab-button:not(.primary) {
        ${tw`text-gray-300`};
      }
    }
  }
`;