'use client';

import { pushToMessages, setConversations, setTyping } from '@/components/shared/chats/reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BaseObject, Conversation, Message } from '@/types';
import { useCallback, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { moveToFront } from '@/utils';

type ChatEventHandler = (event: string, data: ChatEventData) => void;

type ChatEventData = MessageEventData | TypingEventData;

type MessageEventData = {
  conversation: Conversation;
  message: Message;
};

type TypingEventData = {
  conversationId: string;
  participant: string;
};

const CONVERSATION_EVENTS = new Set([
  'message:updated',
  'message:deleted',
  'order:updated',
  'message:new',
  'typing'
]);

const useSocket = () => {
  const { conversations } = useAppSelector((state) => state.chat);
  const ref = useRef<Socket | null>(null);
  const { data: session } = useSession();
  const token = session?.user?.access_token;
  const dispatch = useAppDispatch();

  const getConversationIndex = (conversationId: string) => {
    return conversations.list.findIndex(({ id }) => id === conversationId);
  };

  const chatEventHandler: ChatEventHandler = useCallback((event, data) => {
    switch (event) {
      case 'message:new':
      case 'message:updated':
      case 'message:deleted':
        if (!('conversation' in data && 'message' in data)) return;
        
        const { conversation, message } = data;
        const conversationIndex = getConversationIndex(conversation.id);

        if (conversationIndex < 0) dispatch(setConversations({
          list: [conversation, ...conversations.list]
        }));
        
        dispatch(pushToMessages(message));
        
        if (conversationIndex > 0) {
          dispatch(setConversations({
            list: moveToFront(
              conversations.list,
              conversationIndex
            )
          }));
        }

        break;
      case 'typing':
        dispatch(setTyping(data as TypingEventData));
        break;
      case 'order:updated':
        console.log('[order event]', event, data);
        // dispatch(updateOrder(data));
        break;
    }
  }, []);

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
    
    socket.onAny((event: string, data: BaseObject) => {
      console.log('Socket event received --> ', event, data);
      if (!CONVERSATION_EVENTS.has(event)) return;
      chatEventHandler(event, data as ChatEventData);
    });

    return () => {
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('connect');
      socket.disconnect();
      socket.offAny();

      ref.current = null;
    };
  }, [token]);

  return ref.current;
};

export default useSocket;