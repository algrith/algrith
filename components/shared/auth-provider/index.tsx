'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';

import { fetchUserProfile } from '@/components/dashboard/slices';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SocketContext } from '../layout/context';
import useSocket from '@/hooks/socket';
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
  const socket = useSocket();
  
  useEffect(() => {
    if (status === 'authenticated' && session.user && !authUser && !loading) {
      dispatch(fetchUserProfile(session.user.id));
    }
    
    if (status === 'unauthenticated' && isProtectedRoute) {
      console.log('Logging out...');
    }
  }, [session, status]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default NextAuthProvider;