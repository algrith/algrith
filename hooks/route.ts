import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { inProtectedRoute } from '@/middleware';
import { usePreviousState } from './prev-state';
import { BaseObject, Routes } from '@/types';

const initialRouteStates = {
  forgotPassword: false,
  passwordReset: false,
  verifyEmail: false,
  isDashboard: false,
  dashboard: false,
  homePage: false,
  account: false,
  orders: false,
  signIn: false,
  signUp: false,
  order: false,
  auth: false
};

export const getActiveRoute = (payload?: string | BaseObject) => {
  const route = (!payload && typeof window !== 'undefined') ? location.pathname : '/';
  const routes = typeof payload === 'object' ? payload : getRouteStatuses(route);
  const activeRoute = Object.entries(routes).find(([_, value]) => value)?.[0] ?? '';
  return activeRoute as Routes;
};

export const getRouteStatuses = (route?: string) => {
  const pathname = (!route && typeof window !== 'undefined') ?
    location.pathname
  :
    route || ''
  ;

  const isDashboardPath = pathname.startsWith('/dashboard');
  const isAuthPath = pathname.startsWith('/auth');
  const orderPaths = ['create', 'edit'].join('|');

  return {
    order: new RegExp(`^/dashboard/orders/(?!${orderPaths}$)[^/]+$`).test(pathname),
    forgotPassword: isAuthPath && pathname.includes('/forgot-password'),
    passwordReset: isAuthPath && pathname.includes('/password-reset'),
    verifyEmail: isAuthPath && pathname.includes('/verify-email'),
    signUp: isAuthPath && pathname.includes('/sign-up'),
    account: pathname === '/dashboard/account',
    orders: pathname === '/dashboard/orders',
    dashboard: pathname === '/dashboard',
    isDashboard: isDashboardPath,
    homePage: pathname === '/',
    signIn: isAuthPath,
    auth: isAuthPath
  };
};

const useRoute = () => {
  const [isRouteChanged, setRouteChanged] = useState(false);
  const [routes, setRoutes] = useState(initialRouteStates);
  const activeRoute = getActiveRoute(routes);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isProtectedRoute = inProtectedRoute(pathname);
  const previousPath = usePreviousState(pathname);

  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      setRouteChanged(true);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isRouteChanged) setRouteChanged(false);
  }, [isRouteChanged]);

  useEffect(() => {
    setRoutes(getRouteStatuses(pathname));
  }, [pathname]);

  return {
    isProtectedRoute,
    isRouteChanged,
    searchParams,
    activeRoute,
    pathname,
    routes
  };
};

export default useRoute;