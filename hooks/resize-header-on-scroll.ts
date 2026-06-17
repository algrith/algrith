import { useEffect } from 'react';
import useViewport from './viewport';

const useResizeHeaderOnScroll = () => {
  const { viewport } = useViewport();

  const resizeHeaderOnScroll = () => {
    const navMenu = document.querySelector('#nav-menu') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;
    
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      if (!['sm', 'md'].includes(viewport)) navMenu.classList.add('scrolled');
      header.classList.add('scrolled');
    } else {
      if (!['sm', 'md'].includes(viewport)) navMenu.classList.remove('scrolled');
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