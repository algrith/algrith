import { BaseObject, Conversation, Message, OrderModel } from '@/types';
import { inProduction } from '../utils/server';
import { io, Socket } from 'socket.io-client';
import { auth } from '../libs/auth';
import { Server } from 'socket.io';

let socket: Socket | null = null;

export const socketEmitter = async (event: string, data: BaseObject) => {
  const url = `${getSocketUrl()}/emit`;
  const session = await auth();
  
  if (!session?.user) return console.error('Socket user not found');
  console.log('Socket event emitted --> ', event, data);
  const { user } = session;
  
  await fetch(url, {
    body: JSON.stringify({ userId: user.id, event, data }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
};

export const getSocket = (token: string) => {
  if (!socket) {
    let socketUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    if (!inProduction) {
      socketUrl = socketUrl.replace(/\d$/, '1');
    }

    socket = io(socketUrl, {
      transports: ['polling'],
      path: '/socket',
      auth: { token },
    });
    
    socket.on('connect_error', (error) => console.error('Socket error --> ', error.message));
    socket.on('connect', () => console.log('Socket connected --> ', socket?.id));
    socket.on('disconnect', () => console.log('Socket disconnected'));
  }

  return socket;
};

export const disconnectSocket = () => {
  console.log('Socket offloaded');
  socket?.off('connect_error');
  socket?.off('disconnect');
  socket?.off('connect');
  socket?.disconnect();
  socket?.offAny();
  socket = null;
};

export const getSocketUrl = () => {
  let socketUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  if (!inProduction) {
    socketUrl = socketUrl.replace(/\d$/, '1');
  }

  return socketUrl;
};

export class SocketEvents {
  private userId: string;
  private io: Server;

  constructor (userId: string, io: Server) {
    this.userId = userId;
    this.io = io;
  };
  
  'message:new' = (data: { conversation: Conversation, message: Message }) => {
    const { conversation, message } = data;
    const { userId, io } = this;
    
    for (const participant of conversation.participants) {
      if (participant.user?.toString() === userId) continue;
      
      io.in(`user:${participant.user}`).emit('message:new', {
        conversation,
        message
      });
    }
  };

  'order:updated' = (order: OrderModel) => {
    const orderOwner = order.user as string;
    const { userId, io } = this;
    
    if (orderOwner !== userId) {
      io.to(`user:${orderOwner}`).emit('order:updated', order);
    } else {
      io.in('admins').emit('order:updated', order);
    }
  };

  'order:new' = (order: OrderModel) => {
    const { io } = this;
    io.in('admins').emit('order:new', order);
  };
};