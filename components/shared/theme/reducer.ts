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
    changeThemeMode: (state, action: PayloadAction<AppThemeState['mode']>) => {
      const mode = action.payload;

      const isNotDeviceThemeMode = ['light', 'dark'].includes(mode);
      localStorage.removeItem('themeMode');
      
      if (isNotDeviceThemeMode) localStorage.setItem('themeMode', mode);
      state.mode = mode;
    }
  }
});

const { reducer, actions } = themeSlice;

export const {
  changeThemeMode
} = actions;

export default reducer;