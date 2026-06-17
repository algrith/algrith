'use'

import { ReactNode } from 'react';

import SidebarToggler from '@/components/dashboard/sidebar/toggler';
import { DashboardWrapper } from '@/components/dashboard/styled';
import DashboardSidebar from '@/components/dashboard/sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardWrapper>
      <DashboardSidebar />

      <div className="main-view">
        {children}
      </div>
      
      <SidebarToggler />
    </DashboardWrapper>
  );
};

export default Layout;