'use client';

import tw, { styled } from 'twin.macro';

export const AvatarContainer = styled.span`
  ${tw`relative h-auto`};

  &.large {
    ${tw`w-20`};

    .ant-avatar {
      ${tw`text-5xl h-20`};
    }
  }

  &.middle {
    ${tw`w-16`};

    .ant-avatar {
      ${tw`text-4xl h-16`};
    }
  }

  &.small {
    ${tw`w-8`};

    .ant-avatar {
      ${tw`text-3xl h-8`};
    }
  }

  .ant-avatar {
    ${tw`w-full font-bold shadow`};

    &.add-background {
      ${tw`bg-theme-primary`};
    }
  }

  button.upload-icon {
    ${tw`flex items-center justify-center border-white w-6 h-6 absolute -bottom-1 -right-1 bg-theme-secondary rounded-full text-sm`};
    padding: 0 !important;
  }

  input {
    ${tw`hidden`};
  }
`;
