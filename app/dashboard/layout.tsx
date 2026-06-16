'use'

import { ReactNode } from 'react';

import SidebarToggler from '@/components/dashboard/sidebar/toggler';
import { DashboardWrapper } from '@/components/dashboard/styled';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Chats from '@/components/shared/chats';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardWrapper>
      <DashboardSidebar />

      <div className="main-view">
        {children}
      </div>
      
      <SidebarToggler />
      <Chats />
    </DashboardWrapper>
  );
};

export default Layout;