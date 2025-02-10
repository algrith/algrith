'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import useResizeHeaderOnScroll from '@/hooks/resize-header-on-scroll';
import { HeaderWrapper } from '@/components/shared/layout/styled';
import useToggleNavbar from '@/hooks/toggle-tavbar';
import Link from '@/components/shared/button/link';
import { assets } from '@/libs/assets';

const Header = () => {
  const { openNavbar } = useToggleNavbar();
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
        
        <button onClick={openNavbar} type="button" className="menu">
          <MenuOutlined />
        </button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;