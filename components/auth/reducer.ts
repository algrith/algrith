import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '@/types';

const initialState: AuthState = {
  isVerifying: true,
  isLoading: false,
  user: undefined,
  model: {
    confirm_password: '',
    password: '',
    email: '',
    image: '',
    name: ''
  }
}

export const modalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthModel: (state, action: PayloadAction<Partial<AuthState['model']>>) => {
      state.model = {
        ...state.model,
        ...action.payload
      };
    },
    setIsVerifying: (state, action: PayloadAction<boolean>) => {
      state.isVerifying = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuthModel: (state, action: PayloadAction) => {
      state.model = initialState.model;
    }
  }
})

const { reducer, actions } = modalSlice;

export const {
  updateAuthModel,
  setIsVerifying,
  clearAuthModel,
  setIsLoading
} = actions;

export default reducer;