'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

import useRoute from '@/hooks/route';

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </SessionProvider>
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isProtectedRoute, routes: { isAuth } } = useRoute();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'unauthenticated' && isProtectedRoute) {
      console.log('Logging out...');
    }

    if (status === 'authenticated') {
      console.log('Removed intended route.');
    }
  }, [status]);

  return children;
};

export default NextAuthProvider;