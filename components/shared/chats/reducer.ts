import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatState, Message } from '@/types';

const initialState: ChatState = {
  showConversations: false,
  conversations: {
    total_unread: 0,
    loading: false,
    list: []
  },
  conversation: {
    index: undefined,
    data: undefined,
    loading: false,
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
    }
  }
})

const { reducer, actions } = chatSlice;

export const {
  setShowConversations,
  setConversations,
  setConversation,
  updateMessage,
  setMessages
} = actions;

export default reducer;