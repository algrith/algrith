import tw, { styled } from 'twin.macro';
import { borderCss } from '../layout/styled';

export const ChartWrapper = styled.div`
  ${tw`flex flex-col gap-4 rounded-xl backdrop-blur-sm dark:bg-transparent p-6`};
  ${borderCss};
  
  .container {
    ${tw`p-0 w-full flex flex-col items-center justify-center overflow-hidden`};
  }
  
  h2 {
    ${tw`font-semibold text-xl text-gray-600 dark:text-gray-300 capitalize`};
  }
`;