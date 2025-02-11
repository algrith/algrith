'use client';

import { CloseOutlined, FacebookFilled, LinkedinFilled, TwitterOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import useToggleNavbar from '@/hooks/toggle-tavbar';
import Link from '@/components/shared/button/link';
import { NavbarWrapper } from './styled';
import { assets } from '@/libs/assets';
import Button from '../button';

const socials = [
	{
		href: '#',
		icon: <FacebookFilled />
	},
	{
		href: '#',
		icon: <TwitterOutlined />
	},
	{
		href: '#',
		icon: <LinkedinFilled />,
	}
];

const links = [
	{ text: 'Home', href: '/' },
	{ text: 'About', href: '/about' },
	{ text: 'How It Works', href: '/how-it-works' },
	{ text: 'Contact', href: '/contact-us' }
];

const Navbar = () => {
  const { closeNavbar } = useToggleNavbar();

	return (
		<NavbarWrapper className="navlinks" id="nav-menu">
			<div className="top">
				<h1 id="navbar-title">
					<Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
					<Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
				</h1>

				<Button
					prependedIcon={<CloseOutlined />}
					onClick={closeNavbar}
					htmlType="button"
					className="menu"
				/>
			</div>

			<div id="navbar-links">
				{links.map((link) => (
					<Link className="ripple-node" key={link.href} href={link.href}>
						{link.text}
					</Link>
				))}
				
				{/* <Link href="/auth/login" className="flex items-center justify-between dark:bg-opacity-50 bg-theme-primary rounded lg:rounded-full ripple-node transition all ease-in-out duration-400 my-2 mx-auto lg:mx-4 py-3 px-4 lg:py-2 lg:px-4 hover:border-opacity-100 border-theme-primary border-b-4 border-opacity-0 dark:border-opacity-0 text-left lg:text-center w-full lg:w-auto text-lg text-white">
					Login
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
				</Link> */}
			</div>
			
			<div className="bottom">
				<div id="navbar-footer-brand" data-aos="fade-right" className="copyright">
					© Copyright <span> Algrith {new Date().getFullYear()} </span>
				</div>

				<div id="navbar-footer-socials" className="socials">
					{socials.map((social, index) => (
						<span key={index} data-aos="fade-left">
							{social.icon}
						</span>
					))}
				</div>
			</div>
		</NavbarWrapper>
  );
};

export default Navbar;