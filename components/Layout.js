import { ScrollToTopController } from '@algrith/scroll-to-top';
import React, { useEffect, useRef } from 'react';
import '@algrith/scroll-to-top/dist/index.css';

import useResizeHeaderOnScroll from '../hooks/useResizeHeaderOnScroll';
import useHideCurrentPageLink from '../hooks/useHideCurrentPageLink';
import useScrollToElement from '../hooks/useScrollToElement';
import DynamicCssGenerator from './DynamicCssGenerator';
import useRippleEffect from '../hooks/useRippleEffect';
import useToggleNavbar from '../hooks/useToggleNavbar';
import ThemeSwitch from './ThemeSwitch';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './Alert';

const Layout = (props) => {
	const closeMenuRef = useRef(null);
	const openMenuRef = useRef(null);
	const overlayRef = useRef(null);
	const navbarRef = useRef(null);

	useEffect(() => { 
		AOS.init({ easing: 'ease-in-out-sine' });
	}, []);

	useScrollToElement({ selector: '.scroll-selector' });
	useResizeHeaderOnScroll();
	useHideCurrentPageLink();
	useRippleEffect();
	
	useToggleNavbar({
		closer: closeMenuRef,
		opener: openMenuRef,
		overlay: overlayRef,
		navbar: navbarRef,
	});

	return (
		<div>
			<Header openMenuRef={openMenuRef} />
			<Navbar closeMenuRef={closeMenuRef} navbarRef={navbarRef} />
			<ThemeSwitch />
			
			{props.children}
			
			<Footer />
      <ScrollToTopController />
			
			<div ref={overlayRef} className="fixed hidden top-0 left-0 z-20 bg-black opacity-50 h-screen w-screen"></div>

			<Alert />

			{/*
				Since TailwindCSS uses treeshaking, classes not visible in jsx elements won't
				be generated. DynamicCssGenerator component helps generate all css styles used
				as javascript variables which are not visible to TailwindCSS at build time.
				Do not forget to add your dynamic classes to this component.
      */}
			<DynamicCssGenerator />
		</div>
	);
};

export default Layout;