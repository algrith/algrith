import { useAppSelector } from '@/store/hooks';
import { UseClassName } from '@/types';

const useClassName = (className: UseClassName = '') => {
  const { theme } = useAppSelector((state) => state.theme);

  return [
    ...(typeof className === 'string' ? [className] : className),
    theme === 'dark' ? 'dark-theme-mode' : ''
  ].join(' ').trim();
};

export default useClassName;