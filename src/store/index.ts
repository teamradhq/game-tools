import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
import scoreboardReducer from './scoreboardSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    scoreboard: scoreboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
