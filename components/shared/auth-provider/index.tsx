'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

import { fetchUserProfile } from '@/components/dashboard/slices';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import useRoute from '@/hooks/route';

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </SessionProvider>
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { profile: { data: authUser, loading } } = useAppSelector((state) => state.dashboard);
  const { data: session, status } = useSession();
  const { isProtectedRoute } = useRoute();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (status === 'authenticated' && session.user && !authUser && !loading) {
      dispatch(fetchUserProfile(session.user.id));
      console.log('Removed intended route.');
    }

    if (status === 'unauthenticated' && isProtectedRoute) {
      console.log('Logging out...');
    }
  }, [session, status]);

  return children;
};

export default NextAuthProvider;