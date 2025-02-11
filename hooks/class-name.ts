import { UseClassName } from '@/types';
import useTheme from './theme';

const useClassName = (className: UseClassName = '') => {
  const { inDarkMode } = useTheme();

  return [
    ...(typeof className === 'string' ? [className] : className),
    inDarkMode ? 'dark-theme-mode' : ''
  ].join(' ').trim();
};

export default useClassName;