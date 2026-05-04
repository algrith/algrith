'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import useResizeHeaderOnScroll from '@/hooks/resize-header-on-scroll';
import { HeaderWrapper } from '@/components/shared/layout/styled';
import useToggleNavbar from '@/hooks/toggle-tavbar';
import Link from '@/components/shared/button/link';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import Button from '../button';

const Header = () => {
  const { openNavbar } = useToggleNavbar();
  const { routes } = useRoute();
  useResizeHeaderOnScroll();
  
  return (
    <HeaderWrapper id="header">
      <div className="wrapper">
        <div id="brand">
          <Link id="brand-title" href="/">
            <Avatar src={assets.brand.logos.white} className="dark" alt="algrith_logo" />
            <Avatar src={assets.brand.logos.black} className="light" alt="algrith_logo" />
          </Link>
        </div>
        
        {!routes.isAuth && (
          <Button
            prependedIcon={<MenuOutlined />}
            onClick={openNavbar}
            htmlType="button"
            className="menu"
          />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;