import tw, { styled } from 'twin.macro';
import { borderCss, squareWaves } from '../layout/styled';

export const ChartWrapper = styled.div`
  ${tw`flex flex-col gap-4 rounded-xl backdrop-blur-sm dark:bg-transparent p-6`};
  ${squareWaves()};
  ${borderCss};
  
  .container {
    ${tw`w-full flex flex-col items-center justify-center`};
  }
  
  h2 {
    ${tw`font-bold text-xl text-gray-600 dark:text-gray-300 capitalize`};
  }
`;