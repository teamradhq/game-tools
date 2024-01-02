import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './index.ts';
import { flip, pause, reset, start, TimerState } from '@src/store/timerSlice.ts';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Get the state of timer state. Optionally, provide a timer control action to define a dispatcher.
 *
 * @param action
 */
export function useTimerControls(
  action?: typeof start | typeof pause | typeof flip | typeof reset
): [TimerState, () => void] {
  const dispatch = useAppDispatch();

  return [
    useAppSelector((state) => state.timer),
    (): void => {
      if (action) {
        dispatch(action());
      }
    },
  ] as const;
}
