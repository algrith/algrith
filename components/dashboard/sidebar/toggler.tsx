'use client';

import { Overlay } from '@/components/shared/layout/styled';
import Toggler from '@/components/shared/layout/toggler';
import useSidebarController from '@/hooks/sidebar';
import { useAppSelector } from '@/store/hooks';

const SidebarToggler = () => {
  const { showConversations } = useAppSelector((state) => state.chat);
  const { handleSidebar, isMobile, sidebar} = useSidebarController();
  const show = isMobile && !sidebar.collapsed;

  return (
    <>
      <Overlay onClick={handleSidebar} className={show ? 'open' : 'closed'} />
      {!showConversations && <Toggler noOffset onClick={handleSidebar} />}
    </>
  );
};

export default SidebarToggler;