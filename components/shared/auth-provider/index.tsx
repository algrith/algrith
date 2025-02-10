'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import useRoute from '@/hooks/route';

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    {children}
    <AuthProvider />
  </SessionProvider>
);

const AuthProvider = () => {
  const { isProtectedRoute, routes: { isAuth } } = useRoute();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'unauthenticated' && isProtectedRoute) {
      console.log('Logging out...');
      location.href = '/auth';
    }

    if (status === 'authenticated') {
      if (isAuth) {
        const intendedRoute = localStorage?.intendedRoute ?? '/';
        console.log('Redirecting to intended route...');
        location.href = intendedRoute;
      }

      localStorage.removeItem('intendedRoute');
      console.log('Removed intended route.');
    }
  }, [status]);

  return null;
};

export default NextAuthProvider;