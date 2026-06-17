import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatState, Message } from '@/types';
import { randomId } from '@/utils';

const defaultMessage: Partial<Message> = {
  temp_id: randomId(),
  attachments: [],
  text: ''
};

const initialState: ChatState = {
  showConversations: false,
  message: defaultMessage,
  orderConversation: {
    data: undefined,
    loading: true,
    unread: 0
  },
  conversations: {
    total_unread: 0,
    loading: true,
    list: []
  },
  conversation: {
    index: undefined,
    data: undefined,
    loading: true,
  },
  messages: {
    loading: true,
    list: []
  }
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setOrderConversation: (state, action: PayloadAction<Partial<ChatState['orderConversation']>>) => {
      state.orderConversation = {
        ...state.orderConversation,
        ...action.payload
      };
    },
    setConversations: (state, action: PayloadAction<Partial<ChatState['conversations']>>) => {
      state.conversations = {
        ...state.conversations,
        ...action.payload
      };
    },
    setConversation: (state, action: PayloadAction<Partial<ChatState['conversation']>>) => {
      state.conversation = {
        ...state.conversation,
        ...action.payload
      };
    },
    setMessages: (state, action: PayloadAction<Partial<ChatState['messages']>>) => {
      state.messages = {
        ...state.messages,
        ...action.payload
      };
    },
    updateMessage: (state, action: PayloadAction<Partial<Message>>) => {
      const messageUpdates = action.payload;

      state.messages.list = state.messages.list.map((message) => {
        if (message.temp_id === action.payload.temp_id) {
          return { ...message, ...messageUpdates };
        }

        return message;
      });
    },
    setShowConversations: (state, action: PayloadAction<boolean>) => {
      state.showConversations = action.payload;
    },
    setMessage: (state, action: PayloadAction<Partial<Message>>) => {
      state.message = {
        ...state.message,
        ...action.payload
      };
    },
    resetMessage: (state, action: PayloadAction) => {
      state.message = defaultMessage;
    }
  }
})

const { reducer, actions } = chatSlice;

export const {
  setOrderConversation,
  setShowConversations,
  setConversations,
  setConversation,
  updateMessage,
  resetMessage,
  setMessages,
  setMessage
} = actions;

export default reducer;