import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FeedbackPayload, FeedbackState } from '@/types';

const initialState: FeedbackState = {
  feedbackType: 'inline',
  placement: 'topRight',
  type: 'success',
  duration: 5,
  show: false,
  message: '',
  target: ''
}

export const modalSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showFeedback: (state, action: PayloadAction<FeedbackPayload>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    clearFeedback: (state, action: PayloadAction) => {
      return { ...initialState };
    }
  }
})

const { reducer, actions } = modalSlice;

export const {
  clearFeedback,
  showFeedback
} = actions;

export default reducer;