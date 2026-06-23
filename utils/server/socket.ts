import { BaseObject } from '@/types';

export const emitToUser = async (userId: string, event: string, data: BaseObject) => {
  await fetch(`${process.env.SOCKET_SERVER_URL}/emit`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, event, data }),
    method: 'POST'
  });
};