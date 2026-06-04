'use client';

import { Overlay } from '@/components/shared/layout/styled';
import Toggler from '@/components/shared/layout/toggler';
import useSidebarController from '@/hooks/sidebar';

const SidebarToggler = () => {
  const { handleSidebar, isMobile, sidebar} = useSidebarController();
  const show = isMobile && !sidebar.collapsed;

  return (
    <>
      <Overlay onClick={handleSidebar} className={show ? 'open' : 'closed'} />
      <Toggler onClick={handleSidebar} />
    </>
  );
};

export default SidebarToggler;