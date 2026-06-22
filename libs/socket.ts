import { Conversation as ConversationModel } from './schema';
import { Conversation, Message } from '@/types';
import { verifyToken } from '@/utils/tokens';
import { Server } from 'socket.io';
import { User } from 'next-auth';

export const getSocket = (): Server | null => globalThis.__io ?? null;

export const initSocket = (server: Server) => {
  if (globalThis.__io) return globalThis.__io;

  server.on('connection', (socket) => {
    const user = socket.data.user;
    if (!user) return;
    
    socket.join(`user:${user.id}`);

    socket.on('conversation:leave', (conversationId: string) => socket.leave(conversationId));
    socket.on('conversation:join',  (conversationId: string) => socket.join(conversationId));

    socket.on('typing:start', async (conversationId: string) => {
      const conversation = await ConversationModel.findOne({ _id: conversationId });
      if (!conversation) return;

      for (const participant of conversation.participants) {
        const participantId = participant.user.toString();
        if (participantId === user.id) continue;

        socket.in(`user:${participantId}`).emit('typing', {
          conversationId: conversation.id,
          participant: user.id
        });
      }
    });

    socket.on('typing:stop', async (conversationId: string) => {
      const conversation = await ConversationModel.findOne({ _id: conversationId });
      if (!conversation) return;

      for (const participant of conversation.participants) {
        const participantId = participant.user.toString();
        if (participantId === user.id) continue;
        socket.in(`user:${participantId}`).emit('typing', undefined);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', user.id);
    });
  });

  server.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Unauthorized'));
    const user = await verifyToken(token);
    socket.data.user = user;
    next();
  });

  globalThis.__io = server;
  return server;
};

export class Socket {
  emitNewMessage = (user: User, conversation: Conversation, message: Message) => {
    for (const participant of conversation.participants) {
      if (participant.user?.toString() === user.id) continue;
      
      getSocket()?.in(`user:${participant.user}`).emit('message:new', {
        conversation,
        message
      });
    }
  };
};