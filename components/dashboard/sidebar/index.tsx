'use client';

import { LogoutOutlined, HomeOutlined, AppstoreOutlined, BookOutlined } from '@ant-design/icons';
import { signOut as NextSignOut, useSession } from 'next-auth/react';

import useSidebarController from '@/hooks/sidebar';
import Link from '@/components/shared/button/link';
import { DashboardSiderWrapper } from './styled';
import Button from '@/components/shared/button';
import useRoute from '@/hooks/route';

export const dashboardRoutes = [
  { text: 'Overview', route: '/dashboard', key: 'dashboard' },
  { text: 'Orders', route: '/dashboard/orders', key: 'orders' }
];

const routeIcons = {
  dashboard: <AppstoreOutlined />,
  orders: <BookOutlined />
};

const DashboardSidebar = () => {
  const { closeMobileSidebar, handleMouseEnter, handleMouseLeave, sidebar } = useSidebarController();
  const { activeRoute, routes } = useRoute();
  const isCollapsed = sidebar.collapsed;
  const { status } = useSession();

  const getButtonType = (route: typeof dashboardRoutes[0]) => {
    const { key } = route;
    const isExact = activeRoute ===  key;
    
    const isActive = isExact;
    return isActive ? 'primary' : 'default'
  };

  // const canAccessRoute = (route: string) => {
  //   const allowedRoutes = routes[role];

  //   return (
  //     allowedRoutes.includes(route) ||
  //     allowedRoutes === '*'
  //   );
  // };

  const signOut = async () => {
    NextSignOut({ callbackUrl: '/auth' });
  };

  const closeSidebar = () => {
    closeMobileSidebar();
  };
  
  if (!routes.isDashboard) return null;

  return (
    <DashboardSiderWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      collapsed={isCollapsed}
      breakpoint="lg"
      trigger={null}
      collapsible
    >
      <div className="container">
        <div className="body">
          {dashboardRoutes.map((route) => (
            <Link
              type={getButtonType(route)}
              className="tab-button"
              onClick={closeSidebar}
              href={route.route}
              key={route.key}
              size="small"
              asButton
            >
              {routeIcons[route.key as keyof typeof routeIcons] || <HomeOutlined />}
              {route.text}
            </Link>
          ))}
        </div>

        <div className="footer">
          <Button
            loading={status === 'loading'}
            icon={<LogoutOutlined />}
            variant="outlined"
            onClick={signOut}
            size="small"
            danger
          >
            Logout
          </Button>
        </div>
      </div>
    </DashboardSiderWrapper>
  );
};

export default DashboardSidebar;
