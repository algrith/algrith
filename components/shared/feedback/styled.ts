'use client';

import tw, { styled } from 'twin.macro';
import { Flex } from 'antd';

import colors from '@/libs/colors';

export const InlineFeedbackWrapper = styled.div`
  line-height: 18px;
	font-size: 12px;

  &.add-block-margin {
    margin-block: 10px;
  }

	&.with-icon {
    ${tw`flex gap-2 items-start`};
    
    .anticon {
      ${tw`pt-1`};
    }
  }
`;

export const NotificationWrapper = styled(Flex)`
  ${tw`rounded-2xl border items-center justify-between overflow-hidden`};

  p {
    ${tw`flex-grow px-4`};
    line-height: 18.23px;
    font-weight: 400;
    font-size: 14px;
    color: #0a0d29;
  }

  button {
    ${tw`text-white flex items-center justify-center border-none py-8 rounded-none`};

    &.warning {
      background-color: ${colors.theme.secondary} !important;
    }

    &.success {
      background-color: ${colors.theme.success} !important;
    }

    &.error {
      background-color: ${colors.theme.error} !important;
    }

    :hover {
      color: white !important;
    }
  }
}`;