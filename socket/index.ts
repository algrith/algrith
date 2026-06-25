import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

import { Conversation, User } from '../libs/schema';
import { SocketEvents } from '../utils/socket';
import { User as UserModel } from 'next-auth';
import { verifyToken } from '../utils/tokens';
import { dbConnect } from '../utils/db';
import { Presence } from '../types';

const port = parseInt(process.env.PORT || '3001', 10);
const PRESENCE_ROOM = 'presence:global';
const hostname = '0.0.0.0';

const syncPresence = async (socket: Socket, user: UserModel) => {
  const sockets = await io.in(PRESENCE_ROOM).fetchSockets();

  const onlineUsers = sockets.reduce((users, { data }) => {
    const socketUserId = data.user?.id;
    if (!socketUserId) return users;

    if (socketUserId !== user.id) {
      users[socketUserId] = 'online';
    }

    return users;
  }, {} as Presence);
  
  socket.emit('presence:synced', onlineUsers);
};

const broadcastPresence = (socket: Socket, data: Presence) => {
  socket.to(PRESENCE_ROOM).emit('presence', data);
};

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
      const events = new SocketEvents(userId, io);
      type EventType = keyof typeof events;
      events?.[event as EventType]?.(data);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log('Emitted event processed --> ', event, data);
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

  // Join relevant broadcast rooms.
  socket.join(`user:${user.id}`);
  socket.join(PRESENCE_ROOM);

  if (user.role === 'admin') {
    const admin = await User.findOne({ _id: user.id });
    if (admin) socket.join('admins');
  }

  // Default event broadcast.
  broadcastPresence(socket, { [user.id]: 'online' });
  syncPresence(socket, user);

  // Releted event listeners.
  socket.on('typing:start', async (conversationId: string) => {
    const conversation = await Conversation.findById(conversationId).lean();
    if (!conversation) return;

    for (const participant of conversation.participants) {
      const participantId = participant.user.toString();
      if (participantId === user.id) continue;

      socket.in(`user:${participantId}`).emit('typing', {
        participant: user.name,
        conversationId
      });
    }
  });

  socket.on('typing:stop', async (conversationId: string) => {
    const conversation = await Conversation.findById(conversationId).lean();
    if (!conversation) return;

    for (const participant of conversation.participants) {
      const participantId = participant.user.toString();
      if (participantId === user.id) continue;
      socket.in(`user:${participantId}`).emit('typing', undefined);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected --> ', socket.id);

    setTimeout(async () => {
      const sockets = await io.in(`user:${user.id}`).fetchSockets();
      if (sockets.length === 0) broadcastPresence(socket, {
        [user.id]: 'offline'
      });
    }, 3000);
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