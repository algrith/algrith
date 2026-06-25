'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import cloneDeep from 'lodash/cloneDeep';

import { pushToMessages, setConversations, setTyping } from '@/components/shared/chats/reducer';
import { setOrders, setPresence, setUsers } from '@/components/dashboard/reducer';
import { ChatEventData, OrderModel, TypingEventData, BaseObject } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { disconnectSocket, getSocket } from '@/utils/socket';
import { moveToFront } from '@/utils';

const CONVERSATION_EVENTS = new Set([
  'message:updated',
  'message:deleted',
  'message:new',
  'typing'
]);

const PRESENCE_EVENTS = new Set([
  'presence:synced',
  'presence'
]);

const ORDER_EVENTS = new Set([
  'order:updated',
  'order:new'
]);

const useSocket = () => {
  const { users, orders } = useAppSelector((state) => state.dashboard);
  const { conversations } = useAppSelector((state) => state.chat);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession();
  const token = session?.user?.access_token;
  const dispatch = useAppDispatch();

  const getConversationIndex = (cid: string) => conversations.list.findIndex(({ id }) => id === cid);
  const getOrderIndex = (orderId: string) => orders.list.findIndex(({ id }) => id === orderId);
  const getUserIndex = (userId: string) => users.list.findIndex(({ id }) => id === userId);

  const chatEventHandler = (event: string, data: ChatEventData) => {
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
    }
  };

  const orderEventHandler = (event: string, order: OrderModel) => {
    if (event === 'order:updated') {
      const orderIndex = getOrderIndex(order.id);
      if (orderIndex < 0) return;
      
      const list = cloneDeep(orders.list);
      list[orderIndex] = order;
      dispatch(setOrders({
        list
      }));
    }

    if (event === 'order:new') {
      dispatch(setOrders({ list: [order, ...orders.list] }));
      const userIndex = getUserIndex(order.user as string);

      if (userIndex >= 0) {
        const list = cloneDeep(users.list);
        list[userIndex].orders_count += 1;
        dispatch(setUsers({ list }));
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    const eventHandler = (event: string, data: BaseObject) => {
      console.log('New web socket event received --> ', event, data);
      if (CONVERSATION_EVENTS.has(event)) chatEventHandler(event, data as ChatEventData);
      if (ORDER_EVENTS.has(event)) orderEventHandler(event, data as OrderModel);
      if (PRESENCE_EVENTS.has(event)) dispatch(setPresence(data));
    };

    socket.onAny(eventHandler);

    return () => {
      socket.offAny(eventHandler);
    };
  }, [conversations, socket, orders, users]);

  // Socket init
  useEffect(() => {
    if (!token) return;
    setSocket(getSocket(token));
    return () => disconnectSocket();
  }, [token]);

  return socket;
};

export default useSocket;