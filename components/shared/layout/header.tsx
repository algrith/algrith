'use client';

import { Avatar, Badge, MenuProps, Dropdown } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { HeaderWrapper } from '@/components/shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setShowConversations } from '../chats/reducer';
import Link from '@/components/shared/button/link';
import useWindowDimensions from '@/hooks/viewport';
import useClassName from '@/hooks/class-name';
import ThemeSwitch from '../theme/switch';
import UserAvatar from '../avatar/user';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import Button from '../button';
import Navbar from './navbar';

const Header = () => {
  const { conversations: { total_unread }, showConversations } = useAppSelector((state) => state.chat);
  const { profile: { data: authUser } } = useAppSelector((state) => state.dashboard);
  const { isRouteChanged, pathname, routes } = useRoute();
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const { dimensions } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const router = useRouter();
  
	const accountMenuItems: MenuProps['items'] = [
    {
			onClick: () => router.push('/dashboard'),
			label: 'Dashboard',
			key: 'dashboard'
		},
		{
			onClick: () => signOut(),
			label: 'Logout',
			key: 'logout',
			danger: true
		}
  ];

  const resizeHeaderOnScroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const className = useClassName([
    (routes.isDashboard || routes.auth) ? 'wide' : '',
    !openNavbar ? (isScrolled ? 'scrolled' : '') : ''
  ]);

  const openChatWidget = () => {
    dispatch(setShowConversations(!showConversations));
  };

  const toggleNavbar = () => {
		setOpenNavbar(!openNavbar);
	};

	const closeNavbar = () => {
		setOpenNavbar(false);
	};

  useEffect(() => {
    window.addEventListener('scroll', resizeHeaderOnScroll);
    resizeHeaderOnScroll();

    return () => {
      window.removeEventListener('scroll', resizeHeaderOnScroll);
    }
  }, []);

  useEffect(() => {
		closeNavbar();
	}, [
    dimensions.width,
    isRouteChanged
  ]);
  
  return (
    <HeaderWrapper className={className}>
      <div id="brand">
        <Link id="brand-title" href="/">
          <Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
          <Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
        </Link>
      </div>

      <div className="right">
        <ThemeSwitch />

        {(!routes.auth && authUser) && (
          <div className="user">
            <Badge className="chat-icon" count={total_unread} size="small" dot>
              <Button
                prependedIcon={<CommentOutlined />}
                onClick={openChatWidget}
                htmlType="button"
                size="small"
              />
            </Badge>

            <Dropdown menu={{items: accountMenuItems}} trigger={['hover']}>
              <UserAvatar />
            </Dropdown>
          </div>
        )}

        {!routes.auth && (
          <Navbar
            toggleNavbar={toggleNavbar}
            pathname={pathname}
            open={openNavbar}
          />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;