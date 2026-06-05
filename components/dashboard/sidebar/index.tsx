'use client';

import { LogoutOutlined, HomeOutlined, AppstoreOutlined, BookOutlined, UserOutlined, ContactsOutlined } from '@ant-design/icons';
import { signOut as NextSignOut, useSession } from 'next-auth/react';

import useSidebarController from '@/hooks/sidebar';
import Link from '@/components/shared/button/link';
import { DashboardSiderWrapper } from './styled';
import Button from '@/components/shared/button';
import useRoute from '@/hooks/route';

const dashboardRoutes = [
  { text: 'Overview', route: '/dashboard', key: 'dashboard', permissionRoles: '*' },
  { text: 'Orders', route: '/dashboard/orders', key: 'orders', permissionRoles: '*' },
  { text: 'Users', route: `/dashboard/users`, key: 'users', permissionRoles: ['admin'] },
  { text: 'Account', route: `/dashboard/account`, key: 'account', permissionRoles: '*' }
];

const routeIcons = {
  dashboard: <AppstoreOutlined />,
  users: <ContactsOutlined />,
  account: <UserOutlined />,
  orders: <BookOutlined />
};

const DashboardSidebar = () => {
  const { closeMobileSidebar, handleMouseEnter, handleMouseLeave, sidebar } = useSidebarController();
  const { data: session, status } = useSession();
  const { activeRoute, routes } = useRoute();
  const isCollapsed = sidebar.collapsed;

  const getButtonType = (route: typeof dashboardRoutes[0]) => {
    const { key } = route;
    const isExact = activeRoute ===  key;
    
    const isActive = isExact;
    return isActive ? 'primary' : 'default'
  };

  const canAccessRoute = (route: typeof dashboardRoutes[0]) => {
    const role = session?.user.role;

    return (
      (role && route.permissionRoles.includes(role)) ||
      route.permissionRoles === '*'
    );
  };

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
            canAccessRoute(route) ? (
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
            ) : null
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
