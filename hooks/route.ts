import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { inProtectedRoute } from '@/middleware';

const initialRouteStates = {
  isWorkspace: false,
  isHomePage: false,
  isAccount: false,
  isAuth: false
};

const useRoute = () => {
  const [routes, setRoutes] = useState(initialRouteStates);
  const pathname = usePathname();

  const isProtectedRoute = inProtectedRoute(pathname);

  useEffect(() => {
    setRoutes({
      isWorkspace: pathname.includes('/workspace'),
      isAccount: pathname.includes('/account'),
      isAuth: pathname.includes('/auth'),
      isHomePage: pathname === '/'
    });
  }, []);

  return { isProtectedRoute, routes };
};

export default useRoute;