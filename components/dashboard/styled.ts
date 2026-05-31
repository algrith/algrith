'use client';

import tw, { styled } from 'twin.macro';

import { SiderWrapper, squareWaves } from '../shared/layout/styled';

export const DashboardSiderWrapper = styled(SiderWrapper)`
  ${tw`z-1 py-8 pl-4 h-full`};

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
    }
  }
`;

export const DashboardWrapper = styled.div`
  ${tw`flex w-full relative h-[calc(100dvh - 4.4rem)] z-1`};

  .main-view {
    ${tw`flex-grow p-8 z-1`};
  }
`;

export const Cards = styled.div`
  ${tw`grid md:grid-cols-2 lg:grid-cols-4 gap-8`};

  .item {
    ${tw`flex gap-2 items-center justify-between rounded-xl dark:backdrop-blur-sm dark:bg-transparent px-7 py-6 border dark:border-gray-500 border-gray-400/50`};
    ${squareWaves()};

    .metadata {
      ${tw`flex flex-col gap-4`};

      h2 {
        ${tw`font-bold text-xl text-gray-600 dark:text-gray-300`};
      }
      
      span {
        ${tw`text-3xl font-extrabold text-gray-600 dark:text-gray-300`};
      }
    }
    
    .anticon {
      ${tw`text-4xl text-gray-600 dark:text-gray-300`};
    }
  }
`;