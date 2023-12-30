import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TimerState = {
  tick: 1000;
  time: number;
  minutes: number;
  seconds: number;
  interval?: number;
  elapsed: number;
  isStarted: boolean;
  isPaused: boolean;
  isFinished: boolean;
};

function initialState(): TimerState {
  return {
    tick: 1000,
    time: 330,
    minutes: 5,
    seconds: 30,
    elapsed: 0,
    isStarted: false,
    isPaused: false,
    isFinished: false,
  };
}

export const timerSlice = createSlice({
  name: 'Timer',
  initialState: initialState(),
  reducers: {
    start: (state) => {
      if (state.isFinished || (state.isStarted && !state.isPaused)) {
        return;
      }

      state.isStarted = true;
      state.isPaused = false;
      state.interval = window.setInterval(() => {
        state.elapsed = state.elapsed + 1;

        if (state.elapsed >= state.time) {
          state.isFinished = true;
          clearInterval(state.interval);
        }
      }, state.tick);
    },
    pause: (state) => {
      state.isPaused = true;

      if (state.interval) {
        clearInterval(state.interval);
      }
    },
    flip: (state) => {
      if (state.isStarted) {
        state.elapsed = state.time - state.elapsed;
      }
    },
    reset: (state) => {
      state.elapsed = 0;
      state.isStarted = false;
      state.isPaused = false;
      state.isFinished = false;
    },
  },
});

export const { start, flip, reset, pause } = timerSlice.actions;

export default timerSlice.reducer;
