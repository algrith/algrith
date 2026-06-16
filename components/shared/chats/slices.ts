import { setConversation, setConversations, setMessages, setOrderConversation } from './reducer';
import { setOrder } from '@/components/dashboard/reducer';
import { Message, OrderModel } from '@/types';
import { AppDispatch, store } from '@/store';
import { moveToFront } from '@/utils';
import { Fetch } from '@/utils/api';
import { User } from 'next-auth';

export const createOrderConversation = (orderId: string, customerId: string, message: Message) => async (dispatch: AppDispatch) => {
  const { conversations } = store.getState().chat;
  dispatch(setConversation({ loading: true }));

  const { success, data } = await Fetch({
    path: `/conversations`,
    method: 'POST',
    body: {
      type: 'order',
      customerId,
      message,
      orderId
    }
  });

  if (success) {
    dispatch(setConversations({
      list: [data.conversation, ...conversations.list]
    }));

    dispatch(setMessages({
      list: [data.message]
    }));
  }

  dispatch(setConversation({
    loading: false,
    ...(success && {
      data: {
        // Use temp_id to avoid fetching
        // messages for new conversation
        temp_id: 'NEW_CONVERSATION',
        ...data.conversation
      }
    })
  }));
};

export const setupOrderChat = (order?: OrderModel, user?: User) => (dispatch: AppDispatch) => {
  if (!order || !user) return;
  
  dispatch(setConversation({
    data: {
      participants: [{ role: user.role || 'customer', user }],
      id: 'NEW_CONVERSATION',
      type: 'order',
      order
    }
  }));
};

export const fetchOrderConversation = (orderId: string) => async (dispatch: AppDispatch) => {
  dispatch(setOrderConversation({ loading: true }));

  const { success, data } = await Fetch({
    path: `/conversations/orders/${orderId}`
  });
  
  dispatch(setOrderConversation({
    data: data?.conversation || undefined,
    unread: data?.unread ?? 0,
    loading: false
  }));
};

export const fetchMessages = (conversationId: string) => async (dispatch: AppDispatch) => {
  dispatch(setMessages({ loading: true }));

  const { data } = await Fetch({
    path: `/conversations/${conversationId}/messages`
  });
  
  dispatch(setMessages({
    list: data.messages || [],
    loading: false
  }));
};

export const updateOrderStatus = (message: Message) => async (dispatch: AppDispatch) => {
  const { order: { data: order } } = store.getState().dashboard;
  const {
    conversation: { data: conversation, index },
    conversations: { list: conversations },
    messages: { list }
  } = store.getState().chat;
  
  if (!conversation || !order) return;
  
  const { success, data } = await Fetch({
    path: `/orders/${order.id}/status`,
    method: 'PATCH',
    body: {
      status: 'delivered',
      message
    }
  });

  if (success) {
    const { message: newMessage, order } = data;

    const messages = list.map((message) => {
      if (message.temp_id === newMessage.temp_id) {
        delete newMessage['temp_id'];
        return newMessage;
      }

      return message;
    });

    dispatch(setMessages({
      list: messages
    }));

    dispatch(setOrder({
      data: order
    }));

    if (index !== 0) {
      dispatch(setConversations({
        list: moveToFront(
          conversations,
          index
        )
      }));
    }
  }
};

export const sendMessage = (message: Message) => async (dispatch: AppDispatch) => {
  const {
    conversation: { data: conversation, index },
    conversations: { list: conversations },
    messages: { list }
  } = store.getState().chat;
  
  if (!conversation) return;
  
  const { success, data } = await Fetch({
    path: `/conversations/${conversation.id}/messages`,
    method: 'POST',
    body: message
  });
  
  if (success) {
    const messages = list.map((message) => {
      if (message.temp_id === data.temp_id) {
        delete data['temp_id'];
        return data;
      }
      
      return message;
    });

    dispatch(setMessages({
      list: messages
    }));

    if (index !== 0) {
      dispatch(setConversations({
        list: moveToFront(
          conversations,
          index
        )
      }));
    }
  }
};

export const fetchConversations = () => async (dispatch: AppDispatch) => {
  dispatch(setConversations({ loading: true }));

  const { data } = await Fetch({
    path: `/conversations`
  });
  
  dispatch(setConversations({
    total_unread: data?.total_unread || 0,
    list: data?.conversations || [],
    loading: false
  }));
};