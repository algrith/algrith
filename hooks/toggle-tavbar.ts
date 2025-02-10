import { useEffect } from 'react';

import useViewport from './viewport';
import useRoute from './route';

const useToggleNavbar = () => {
  const { dimension, viewport } = useViewport();
  const { isRouteChanged } = useRoute();

  const getSelectors = () => {
    const overlay = document.querySelector('#overlay') as HTMLElement;
    const navbar = document.querySelector('#nav-menu') as HTMLElement;
    return { overlay, navbar };
  };
  
  const closeNavbar = () => {
    const { overlay, navbar } = getSelectors();
    overlay.classList.remove('open');
    overlay.classList.add('closed');
    navbar.classList.remove('open');
    navbar.classList.add('closed');
  };

  const openNavbar = () => {
    const { overlay, navbar } = getSelectors();
    overlay.classList.remove('closed');
    navbar.classList.remove('closed');
    overlay.classList.add('open');
    navbar.classList.add('open');
  };

  useEffect(() => {
    if (['xl', '2xl'].includes(viewport) || isRouteChanged) {
      closeNavbar();
    }
  }, [isRouteChanged, dimension]);

  return { closeNavbar, openNavbar };
};

export default useToggleNavbar;