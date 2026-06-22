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
  showOrdersModal: false,
  typing: undefined,
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
    loading: false
  },
  messages: {
    loading: false,
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
    setTyping: (state, action: PayloadAction<ChatState['typing']>) => {
      state.typing = action.payload;
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
    setShowOrdersModal: (state, action: PayloadAction<boolean>) => {
      state.showOrdersModal = action.payload;
    },
    pushToMessages: (state, action: PayloadAction<Message>) => {
      state.messages.list.push(action.payload);
      state.conversations.total_unread += 1;
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
  setShowOrdersModal,
  setConversations,
  setConversation,
  pushToMessages,
  updateMessage,
  resetMessage,
  setMessages,
  setMessage,
  setTyping,
} = actions;

export default reducer;