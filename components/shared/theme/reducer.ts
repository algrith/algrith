import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThemeState } from '@/types';

// Define the initial state using that type
const initialState: AppThemeState = {
  mode: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<AppThemeState['mode']>) => {
      if (action.payload) localStorage.setItem('theme', action.payload);
      state.mode = action.payload;
    }
  }
});

const { reducer, actions } = themeSlice;

export const {
  changeTheme
} = actions;

export default reducer;