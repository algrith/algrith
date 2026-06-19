'use client';

import { Avatar, Badge, MenuProps, Dropdown } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import useResizeHeaderOnScroll from '@/hooks/resize-header-on-scroll';
import { HeaderWrapper } from '@/components/shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setShowConversations } from '../chats/reducer';
import Link from '@/components/shared/button/link';
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
  const dispatch = useAppDispatch();
  const { routes } = useRoute();
  const router = useRouter();
  useResizeHeaderOnScroll();
  
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

  const className = useClassName([
    (routes.isDashboard || routes.auth) ? 'wide' : ''
  ]);

  const openChatWidget = () => {
    dispatch(setShowConversations(!showConversations));
  };
  
  return (
    <HeaderWrapper id="header" className={className}>
      <div id="brand">
        <Link id="brand-title" href="/">
          <Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
          <Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
        </Link>
      </div>

      <div className="controls">
        <ThemeSwitch />

        {(!routes.auth && authUser) && (
          <div className="user-controls">
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

        <Navbar />
      </div>
    </HeaderWrapper>
  );
};

export default Header;