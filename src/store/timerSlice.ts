import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TimerState = {
  tick: 1000;
  time: number;
  interval?: number;
  elapsed: number;
  isStarted: boolean;
  isPaused: boolean;
  isFinished: boolean;
  showTime: boolean;
};

function initialState(): TimerState {
  return {
    tick: 1000,
    time: 10,
    elapsed: 0,
    isStarted: false,
    isPaused: false,
    isFinished: false,
    showTime: true,
  };
}

export const timerSlice = createSlice({
  name: 'Timer',
  initialState: initialState(),
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      if (state.isStarted) {
        return;
      }

      state.time = action.payload;
    },
    setShowTime(state, action: PayloadAction<boolean>) {
      state.showTime = action.payload;
    },
    start: (state) => {
      if (state.interval) {
        clearInterval(state.interval);
      }

      state.isStarted = true;
      state.isPaused = false;
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
    tick: (state, action: PayloadAction<number>) => {
      if (state.elapsed >= state.time) {
        state.isFinished = true;
        return;
      }

      state.elapsed = state.elapsed + action.payload;
    },
  },
});

export const { setTime, setShowTime, start, flip, reset, pause, tick } = timerSlice.actions;

export default timerSlice.reducer;
