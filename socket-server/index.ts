import { createServer } from 'http';
import { Server } from 'socket.io';

import { verifyToken } from '../utils/tokens';
import { Conversation } from '../libs/schema';
import { dbConnect } from '../utils/db';

const port = parseInt(process.env.PORT || '3001', 10);
const hostname = '0.0.0.0';

const httpServer = createServer(async (req, res) => {
  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  // Emit endpoint — called by Next.js API routes
  if (req.method === 'POST' && req.url === '/emit') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const { userId, event, data } = JSON.parse(body);

      if (event === 'message:new') {
        for (const participant of data.conversation.participants) {
          if (participant.user?.toString() === userId) continue;
          
          io.in(`user:${participant.user}`).emit('message:new', {
            conversation: data.conversation,
            message: data.populated
          });
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  // Fallback
  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  path: '/socket',
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    credentials: true
  },
});

io.on('connection', async (socket) => {
  const user = socket.data.user;
  if (!user) return;

  socket.join(`user:${user.id}`);

  socket.on('conversation:join',  (id: string) => socket.join(id));
  socket.on('conversation:leave', (id: string) => socket.leave(id));

  socket.on('typing:start', async (conversationId: string) => {
    const conversation = await Conversation.findById(conversationId).lean();
    if (!conversation) return;

    for (const participant of conversation.participants) {
      if (participant.user.toString() === user.id) continue;

      socket.in(`user:${participant.user}`).emit('typing', {
        participant: user.name,
        conversationId
      });
    }
  });

  socket.on('typing:stop', async (conversationId: string) => {
    const conversation = await Conversation.findById(conversationId).lean();
    if (!conversation) return;

    for (const participant of conversation.participants) {
      if (participant.user.toString() === user.id) continue;
      socket.in(`user:${participant.user}`).emit('typing', undefined);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected --> ', user.id);
  });
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Unauthorized'));
  const payload = await verifyToken(token);
  socket.data.user = payload;
  next();
});

dbConnect().then(() => {
  console.log('> Database connection established');

  httpServer.listen(port, hostname, () => {
    console.log(`> Socket server ready on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to connect to database --> ', error);
  process.exit(1);
});

export { io };