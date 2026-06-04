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

export const BillingCycleBadgeWrapper = styled.span`
  ${tw`text-sm font-semibold px-2 py-0.5 rounded-full w-[fit-content] capitalize`};
  
  &.one-time {
    ${tw`bg-[#f0ede4] text-[#7a6a50]`};
  }
  
  &.monthly {
    ${tw`bg-[#e0eeff] text-[#1a3a6b]`};
  }
`;

export const StatusBadgeWrapper = styled.span`
  ${tw`text-sm font-bold px-3 py-1 rounded-full capitalize text-gray-100`};
  
  &.completed {
    ${tw`bg-orange-500`};
  }
  
  &.delivered {
    ${tw`bg-green-600`};
  }
  
  &.cancelled {
    ${tw`bg-red-500`};
  }
  
  &.pending {
    ${tw`bg-gray-500`};
  }
`;

export const DashboardWrapper = styled.div`
  ${tw`flex w-full relative h-[calc(100dvh - 4.4rem)] z-1`};

  .main-view {
    ${tw`w-full flex-grow p-8 z-1`};
  }
`;

export const OrderWrapper = styled.div`
  ${tw`h-full overflow-y-auto`};

  header {
    ${tw`sticky top-0 z-1 flex items-center justify-between pb-4 border-b backdrop-blur border-gray-400/50 dark:border-gray-500/50`};

    h1 {
      ${tw`text-gray-600 dark:text-gray-200 text-2xl font-bold tracking-wide`};
    }

    span {
      ${tw`text-gray-700 font-bold font-mono bg-gray-300 dark:bg-gray-400 rounded-full px-4 pt-0.5`};
    }
  }
  
  .content {
    ${tw`w-full flex flex-col gap-8 py-4`};
    
    .metadata {
      ${tw`text-gray-600 dark:text-gray-400`};
    }
  }
  
  .order {
    ${tw`grid md:grid-cols-[1fr_320px] gap-6`};

    .card {
      ${tw`flex flex-col gap-6`};
    }
    
    .links {
      ${tw`inline-flex justify-around gap-4`};

      a {
        ${tw`text-sm text-gray-600 dark:text-gray-300 font-semibold pb-0.5 border-b border-gray-600 dark:border-gray-300`};
      }
    }
  }
`;

export const CardWrapper = styled.div`
  ${tw`rounded-2xl border p-6 backdrop-blur border-gray-400/50 dark:border-gray-500/50`};

  h3 {
    ${tw`text-gray-600 dark:text-gray-300 text-lg tracking-widest font-bold mb-4`};
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

export const CustomerWrapper = styled(CardWrapper)`
  .info {
    ${tw`flex flex-col gap-5`};

    .item {
      ${tw`flex justify-between gap-2 text-xm`};
      
      .label {
        ${tw`text-gray-500 dark:text-gray-400 tracking-widest`};
      }
      
      .value {
        ${tw`dark:text-gray-200 font-mono`};
      }
    }
  }
`;

export const PaymentWrapper = styled(CardWrapper)`
  .summary {
    ${tw`flex flex-col gap-3`};

    .item {
      ${tw`flex items-center justify-between py-2 text-gray-500 dark:text-gray-300 text-xm`};
      
      span:last-of-type, p:last-of-type {
        ${tw`dark:text-gray-200 font-mono font-semibold`};
      }

      &.total {
        ${tw`border-b border-t border-gray-400/50 dark:border-gray-500/50 mb-4`};

        span {
          ${tw`dark:text-gray-200 text-lg font-semibold`};
        }
      }
      
      .label {
        ${tw`tracking-wide`};
      }
      
      span {
        ${tw`tracking-wide dark:text-gray-400`};
      }
    }
  }
`;

export const AddonWrapper = styled(CardWrapper)`
  .addon {
    ${tw`flex items-center justify-between py-3 border-b border-gray-400/50 dark:border-gray-500/50 text-xm`};
    
    &:last-of-type {
      ${tw`border-b-0`};
    }
    
    .price {
      ${tw`font-semibold dark:text-gray-200 font-mono`};
    }
    
    .item {
      ${tw`flex items-center gap-3`};
      
      .icon {
        ${tw`w-8 h-8 flex items-center justify-center text-lg`};
      }
      
      .text {
        ${tw`flex flex-col gap-0.5 tracking-wide dark:text-gray-400`};
      }
    }
  }
`;

export const PlanWrapper = styled(CardWrapper)`
  .top {
    ${tw`flex items-start justify-between gap-4 mb-4`};
    
    .right {
      ${tw`text-right flex-shrink-0`};

      .price {
        ${tw`text-2xl font-semibold dark:text-gray-200 font-mono`};
      }
      
      .billing-cycle {
        ${tw`text-sm mt-0.5 dark:text-gray-400`};
      }
    }
    
    .left {
      ${tw`flex flex-col dark:text-gray-400`};

      .name {
        ${tw`text-2xl font-bold text-gray-600 dark:text-gray-200`};
        
        .most-popular {
          ${tw`text-sm bg-theme-primary text-gray-100 font-bold px-3 py-1 rounded-full ml-4`};
        }
      }
    }
  }
  
  .features {
    ${tw`flex flex-col gap-3 text-xm`};

    li {
      ${tw`flex gap-3 dark:text-gray-200 leading-[1.6]`};
      
      &:before {
        ${tw`content-["✓"] text-green-500 flex-shrink mt-0.5`};
      }
    }
  }
`;