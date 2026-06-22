'use client';

import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { BaseObject } from '@/types';

const useSocket = () => {
  const ref = useRef<Socket | null>(null);
  const { data: session } = useSession();
  const token = session?.user?.access_token;
  
  const handleNewMessage = (data: BaseObject) => {
    console.log('RECEIVED DATA');
    // dispatch(addMessage(data));
  };

  useEffect(() => {
    if (!token || ref.current?.connected) return;

    const socket = io(process.env.NEXT_PUBLIC_APP_URL, {
      transports: ['websocket'],
      path: '/api/socket',
      auth: { token }
    });

    ref.current = socket;

    socket.on('connect_error', (err) => console.error('Socket error --> ', err.message));
    socket.on('connect', () => console.log('Socket connected --> ', socket.id));
    socket.on('disconnect', () => console.log('Socket disconnected'));
    socket.on('message:new', handleNewMessage);

    return () => {
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('connect');
      socket.disconnect();
      ref.current = null;
    };
  }, [token]);

  return ref.current;
};

export default useSocket;