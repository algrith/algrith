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
	{ text: 'About', href: '/about-us' },
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