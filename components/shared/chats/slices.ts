import { setConversation, setConversations, setMessages } from './reducer';
import { AppDispatch, store } from '@/store';
import { Fetch } from '@/utils/api';
import { Message } from '@/types';

export const createOrderConversation = (orderId: string, customerId: string) => async (dispatch: AppDispatch) => {
  const { conversations } = store.getState().chat;
  dispatch(setConversation({ loading: true }));

  const { success, data } = await Fetch({
    path: `/conversations`,
    method: 'POST',
    body: {
      type: 'order',
      customerId,
      orderId
    }
  });

  if (success && data) dispatch(setConversations({
    list: [...conversations.list, data]
  }));

  const conversation = data ? {
    temp_id: 'NEW_CONVERSATION',
    ...data
  } : undefined;

  dispatch(setConversation({
    data: conversation,
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

export const sendMessage = (message: Message) => async (dispatch: AppDispatch) => {
  const { conversation: { data: conversation }, messages: { list } } = store.getState().chat;
  
  if (!conversation) return;

  const { success, data } = await Fetch({
    path: `/conversations/${conversation.id}/messages`,
    method: 'POST',
    body: message
  });
  
  if (success && data) {
    const messages = list.map((message) => {
      if (message.temp_id === data.temp_id) {
        delete data?.['temp_id'];
        return data;
      }

      return message;
    });

    dispatch(setMessages({
      list: messages
    }));
  }
};

export const fetchConversations = () => async (dispatch: AppDispatch) => {
  dispatch(setConversations({ loading: true }));

  const { data: conversations } = await Fetch({
    path: `/conversations`
  });
  
  dispatch(setConversations({
    list: conversations || [],
    loading: false
  }));
};