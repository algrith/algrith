import { SectionLayout, squareWaves } from '@/components/shared/layout/styled';
import tw, { styled } from 'twin.macro';
import Button from '../shared/button';

export const AuthWrapper = styled(SectionLayout)`
  ${tw`flex flex-col justify-center items-center h-screen`};

  .content {
    ${tw`w-full md:w-[400px] flex flex-col gap-12 p-8 pb-12 text-gray-500 dark:text-gray-400 font-bold tracking-wide shadow backdrop-blur-lg border dark:border-gray-600 rounded-xl z-1`};
    ${squareWaves(true)};

    &.verifying {
      ${tw`justify-center items-center`};
    }
    
    .fields {
      ${tw`flex flex-col gap-8`};
    }
    
    .footer {
      ${tw`text-sm flex justify-center items-center flex-col gap-6`};

      a {
        ${tw`text-theme-primary`};
      }
    }
    
    .error {
      ${tw`text-red-400`};
    }
    
    h1 {
      ${tw`text-3xl text-gray-600 dark:text-gray-300`};
    }
  }
`;

export const OAuthButtonWrapper = styled(Button)`
	${tw`relative text-lg border-solid border-gray-200`};

  &:hover:not(:disabled) {
	  ${tw`filter hover:brightness-100`};
  }
  
	.ant-avatar {
		${tw`absolute left-4`};
	}
`;