import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import feedbackReducer from '@/components/shared/feedback/reducer';
import themeReducer from '@/components/shared/theme/reducer';
import { loggerMiddleware } from '@/utils/logger';
import { inProduction } from '@/utils';

const reducers = combineReducers({
  feedback: feedbackReducer,
  theme: themeReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'REHYDRATE',
        'REGISTER',
        'PERSIST',
        'FLUSH',
        'PAUSE',
        'PURGE'
      ],
    },
  }).concat(loggerMiddleware),
  devTools: !inProduction,
  preloadedState: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;