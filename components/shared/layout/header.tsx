'use client';

import { CommentOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

import useResizeHeaderOnScroll from '@/hooks/resize-header-on-scroll';
import { HeaderWrapper } from '@/components/shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setShowConversations } from '../chats/reducer';
import useToggleNavbar from '@/hooks/toggle-tavbar';
import Link from '@/components/shared/button/link';
import useClassName from '@/hooks/class-name';
import ThemeSwitch from '../theme/switch';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import Button from '../button';

const Header = () => {
  const { conversations: { total_unread } } = useAppSelector((state) => state.chat);
  const { openNavbar } = useToggleNavbar();
  const dispatch = useAppDispatch();
  const { routes } = useRoute();
  useResizeHeaderOnScroll();

  const className = useClassName([
    (routes.isDashboard || routes.auth) ? 'wide' : ''
  ]);

  const openChatWidget = () => {
    dispatch(setShowConversations(true));
  };
  
  return (
    <HeaderWrapper id="header" className={className}>
      <div className="wrapper">
        <div id="brand">
          <Link id="brand-title" href="/">
            <Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
            <Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
          </Link>
        </div>

        <div className="controls">
          <ThemeSwitch />

          {!routes.auth && (
            <>
              <Badge className="chat-icon" count={total_unread} size="small" dot>
                <Button
                  prependedIcon={<CommentOutlined />}
                  onClick={openChatWidget}
                  htmlType="button"
                  size="small"
                />
              </Badge>

              <Button
                prependedIcon={<MenuOutlined />}
                onClick={openNavbar}
                htmlType="button"
                className="menu"
              />
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;