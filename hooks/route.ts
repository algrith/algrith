import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { inProtectedRoute } from '@/middleware';
import { usePreviousState } from './prev-state';

const initialRouteStates = {
  isWorkspace: false,
  isHomePage: false,
  isAccount: false,
  isAuth: false
};

const useRoute = () => {
  const [isRouteChanged, setRouteChanged] = useState(false);
  const [routes, setRoutes] = useState(initialRouteStates);
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
    setRoutes({
      isWorkspace: pathname.includes('/workspace'),
      isAccount: pathname.includes('/account'),
      isAuth: pathname.includes('/auth'),
      isHomePage: pathname === '/'
    });
  }, []);

  return { isProtectedRoute, isRouteChanged, routes };
};

export default useRoute;