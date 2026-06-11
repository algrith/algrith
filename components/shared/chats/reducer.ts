import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatState } from '@/types';

const initialState: ChatState = {
  showConversations: false,
  conversations: {
    loading: false,
    list: []
  },
  conversation: {
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
  setMessages
} = actions;

export default reducer;