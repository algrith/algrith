import { verifyToken } from '@/utils/tokens';
import { Server } from 'socket.io';

export const initSocket = (server: Server) => {
  if (globalThis.__io) return globalThis.__io;

  server.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Unauthorized'));

    const payload = await verifyToken(token);
    socket.data.user = payload;
    next();
  });

  server.on('connection', (socket) => {
    const user = socket.data.user;
    socket.join(`user:${user.id}`);

    socket.on('conversation:leave', (conversationId: string) => socket.leave(conversationId));
    socket.on('conversation:join',  (conversationId: string) => socket.join(conversationId));

    socket.on('typing:start', (conversationId: string) => {
      socket.to(conversationId).emit('typing:start', {
        conversationId,
        user: { name: user.name, id: user.id }
      });
    });

    socket.on('typing:stop', (conversationId: string) => {
      socket.to(conversationId).emit('typing:stop', {
        conversationId,
        userId: user.id
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', user.id);
    });
  });

  globalThis.__io = server;
  return server;
};

export const getSocket = (): Server | null => globalThis.__io ?? null;