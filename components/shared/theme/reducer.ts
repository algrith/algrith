import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThemeState } from '@/types';

// Define the initial state using that type
const initialState: AppThemeState = {
  isSystemTheme: false,
  theme: 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppThemeState['theme']>) => {
      if (action.payload) localStorage.setItem('theme', action.payload);
      state.theme = action.payload;
    },
    setIsSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.isSystemTheme = action.payload;
    }
  }
});

const { reducer, actions } = themeSlice;

export const {
  setIsSystemTheme,
  setTheme
} = actions;

export default reducer;