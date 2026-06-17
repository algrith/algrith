'use client';

import { darkBgGradient, Overlay } from '@/components/shared/layout/styled';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';
import { ScrollToTopController } from '@algrith/scroll-to-top';
import useScrollToElement from '@/hooks/scroll-to-element';
import useToggleNavbar from '@/hooks/toggle-tavbar';
import useLazyLoader from '@/hooks/lazy-loader';
import '@algrith/scroll-to-top/dist/index.css';
import { Global } from '@emotion/react';
import useRoute from '@/hooks/route';
import { useEffect } from 'react';
import '../public/css/fonts.css';
import '../public/css/icons.css';
import '../public/css/app.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const customStyles = css`
  body, html {
    ${tw`antialiased font-medium font-gilroy text-theme-text h-full p-0 m-0 bg-gray-50 dark:bg-dark-mode-primary dark:text-dark-mode-septenary`};
  }
  
  a {
    ${tw`text-theme-link hover:text-theme-link hover:text-opacity-70 no-underline`};
  }

  button, [type='button'], [type='reset'], [type='submit'] {
    ${tw`disabled:cursor-not-allowed`};
  }
  
  .ant-badge :is(.ant-badge-count, .ant-badge-dot) {
    ${tw`shadow-none`};
  }
  
  .ant-select-dropdown {
    ${darkBgGradient.twoLayers};
    
    .ant-select-item-option {
      ${tw`dark:text-gray-300 hover:(bg-gray-200 dark:bg-dark-mode-secondary)`};

      &.ant-select-item-option-selected {
        ${tw`dark:bg-dark-mode-secondary/50`};
      }
    }
  }
`;

const GlobalStyles = () => {
  const { closeNavbar } = useToggleNavbar();
  const { routes } = useRoute();
	useScrollToElement();
  useLazyLoader();
  
  const restrictedScrollToTopControllerRoutes = [routes.isDashboard, routes.auth];
  const showScrollToTopController = !restrictedScrollToTopControllerRoutes.some(Boolean);

  useEffect(() => { 
		AOS.init({
      easing: 'ease-in-out-sine'
    });
	}, []);
  
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
      {showScrollToTopController && <ScrollToTopController />}
      <Overlay onClick={closeNavbar} id="overlay" />
    </>
  );
};

export default GlobalStyles;