import { useEffect } from 'react';
import useViewport from './viewport';

const useResizeHeaderOnScroll = () => {
  const { viewport } = useViewport();

  const resizeHeaderOnScroll = () => {
    const header = document.querySelector('header') as HTMLElement;
    
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', resizeHeaderOnScroll);

    return () => {
      window.removeEventListener('scroll', resizeHeaderOnScroll);
    }
  }, [viewport]);
};

export default useResizeHeaderOnScroll;