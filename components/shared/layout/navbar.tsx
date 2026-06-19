'use client';

import { CloseOutlined, FacebookFilled, LinkedinFilled, MenuOutlined, XOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';

import { MenuButton, NavbarWrapper, Overlay } from './styled';
import Link from '@/components/shared/button/link';
import useViewport from '@/hooks/viewport';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import { useAppSelector } from '@/store/hooks';

const socials = [
	{
		href: 'https://web.facebook.com/algrithllc',
		icon: <FacebookFilled />
	},
	{
		href: 'https://x.com/algrithllc',
		icon: <XOutlined />
	},
	{
		href: 'https://www.linkedin.com/company/algrith',
		icon: <LinkedinFilled />,
	}
];

const links = [
	{ text: 'Home', href: '/' },
	{ text: 'About', href: '/about-us' },
	{ text: 'Pricing', href: '/pricing' },
	{ text: 'How It Works', href: '/how-it-works' },
	{ text: 'Contact', href: '/contact-us' }
];

const Navbar = () => {
	const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
	const [visibilityClass, setVisibilityClass] = useState('');
  const { pathname, routes } = useRoute();
  const { isRouteChanged } = useRoute();
  const { dimensions } = useViewport();

	const getClassName = (path: string) => [
		pathname === path ? 'active' : '',
		'ripple-node',
	].filter(Boolean).join(' ');

	const toggleNavbar = () => {
		setVisibilityClass(!visibilityClass ? 'open' : '');
	};

	const closeNavbar = () => {
		setVisibilityClass('');
	};

	useEffect(() => {
		closeNavbar();
	}, [isRouteChanged, dimensions]);
	
  if (routes.auth) return null;

	return (
		<NavbarWrapper className={visibilityClass}>
			{visibilityClass && <Overlay onClick={closeNavbar} />}
			
			<MenuButton
				prependedIcon={visibilityClass ? <CloseOutlined /> : <MenuOutlined />}
				className={visibilityClass}
				onClick={toggleNavbar}
				htmlType="button"
			/>

			<div className="wrapper">
				<div className="top">
					<h1 id="navbar-title">
						<Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
						<Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
					</h1>
				</div>

				<div className="links">
					{links.map((link) => (
						<Link className={getClassName(link.href)} key={link.href} href={link.href}>
							{link.text}
						</Link>
					))}

					{!authUser && (
						<Link className={getClassName('/auth')} href="/auth">
							Login
						</Link>
					)}
				</div>
				
				<div className="bottom">
					<div className="copyright">
						© Copyright <span> Algrith {new Date().getFullYear()} </span>
					</div>

					<div className="socials">
						{socials.map((social, index) => (
							<span key={index}>
								{social.icon}
							</span>
						))}
					</div>
				</div>
			</div>
		</NavbarWrapper>
  );
};

export default Navbar;