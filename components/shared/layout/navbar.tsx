'use client';

import { CloseOutlined, FacebookFilled, LinkedinFilled, LoginOutlined, XOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, Dropdown } from 'antd';
import { MenuProps } from 'antd';

import useToggleNavbar from '@/hooks/toggle-tavbar';
import Link from '@/components/shared/button/link';
import { NavbarWrapper } from './styled';
import UserAvatar from '../avatar/user';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import Button from '../button';

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
	const { data: session, status } = useSession();
  const { closeNavbar } = useToggleNavbar();
  const { pathname, routes } = useRoute();
	const loading = status === 'loading';
	const router = useRouter();
	const user = session?.user;

	const accountMenuItems: MenuProps['items'] = [
    ...(user ? [
			{
				onClick: () => router.push('/dashboard'),
				label: 'Dashboard',
				key: 'dashboard'
			},
			{
				onClick: () => signOut(),
				label: 'Logout',
				key: 'logout'
			}
		] : [
			{
				onClick: () => router.push('/auth'),
				label: 'Login',
				key: 'login'
			}
		])
  ];

	const getClassName = (path: string) => [
		pathname === path ? 'active' : '',
		'ripple-node',
	].filter(Boolean).join(' ');
  
  if (routes.isAuth) return null;

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
					<Link className={getClassName(link.href)} key={link.href} href={link.href}>
						{link.text}
					</Link>
				))}

				<Dropdown menu={{items: accountMenuItems}} trigger={['hover']}>
					{user ? <UserAvatar className="user-avatar" /> : <LoginOutlined />}
				</Dropdown>
			</div>
			
			<div className="bottom">
				<div id="navbar-footer-brand" className="copyright">
					© Copyright <span> Algrith {new Date().getFullYear()} </span>
				</div>

				<div id="navbar-footer-socials" className="socials">
					{socials.map((social, index) => (
						<span key={index}>
							{social.icon}
						</span>
					))}
				</div>
			</div>
		</NavbarWrapper>
  );
};

export default Navbar;