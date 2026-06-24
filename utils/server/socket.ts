import { BaseObject, Conversation, Message } from '@/types';
import { inProduction } from '@/utils/server';
import { auth } from '../../libs/auth';
import { Server } from 'socket.io';

export const socketEmitter = async (event: string, data: BaseObject) => {
  const socketUrl = `${getSocketUrl()}/emit`;
  const session = await auth();

  if (!session?.user) return console.error('Socket user not found');
  const { user } = session;
  
  await fetch(socketUrl, {
    body: JSON.stringify({ userId: user.id, event, data }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
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
  
  'message:new' = (data: { conversation: Conversation, populated: Message }) => {
    const { conversation, populated: message } = data;
    const { userId, io } = this;
    
    for (const participant of conversation.participants) {
      if (participant.user?.toString() === userId) continue;
      
      io.in(`user:${participant.user}`).emit('message:new', {
        conversation,
        message
      });
    }
  }
};