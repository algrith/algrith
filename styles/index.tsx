'use client';

import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';
import { ScrollToTopController } from '@algrith/scroll-to-top';
import { Overlay } from '@/components/shared/layout/styled';
import useScrollToElement from '@/hooks/scroll-to-element';
import useRippleEffect from '@/hooks/ripple-effect';
import useToggleNavbar from '@/hooks/toggle-tavbar';
import useNavBarLinks from '@/hooks/nav-bar-link';
import '@algrith/scroll-to-top/dist/index.css';
import { Global } from '@emotion/react';
import { useEffect } from 'react';
import '../public/css/fonts.css';
import '../public/css/icons.css';
import '../public/css/app.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const customStyles = css`
  body, html {
    ${tw`antialiased font-medium font-gilroy text-theme-text h-full p-0 m-0 dark:bg-dark-mode-primary dark:text-dark-mode-septenary`};
  }
  
  a {
    ${tw`text-theme-link hover:text-theme-link hover:text-opacity-70 no-underline`};
  }

  button, [type='button'], [type='reset'], [type='submit'] {
    ${tw`disabled:cursor-not-allowed`}
  }
`;

const GlobalStyles = () => {
  const { closeNavbar } = useToggleNavbar();
	useScrollToElement();
	useRippleEffect();
	useNavBarLinks();
  
  useEffect(() => { 
		AOS.init({
      easing: 'ease-in-out-sine'
    });
	}, []);
  
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
      <ScrollToTopController />
      <Overlay onClick={closeNavbar} id="overlay" />
    </>
  );
};

export default GlobalStyles;