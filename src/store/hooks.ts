import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './index.ts';
import { flip, pause, reset, start, tick, TimerState } from '@src/store/timerSlice.ts';
import { RefObject, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

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

/**
 * Runs a timer effect that dispatches a tick action at a specified rate
 * whenever the timer is in a running state.
 *
 * @param ticksPerSecond - The number of ticks per second to dispatch (Default 1).
 */
export function useRunTimerEffect(ticksPerSecond: number = 1): void {
  const dispatch = useAppDispatch();
  const [{ isStarted, isPaused, isFinished }] = useTimerControls();

  const tps = Math.abs(ticksPerSecond) > 0 ? Math.abs(ticksPerSecond) : 1;

  useEffect(() => {
    let interval: number | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        if (isStarted && !isPaused && !isFinished) {
          dispatch(tick(1 / tps));
        }

        if (isFinished) {
          clearInterval(interval);
        }
      }, 1000 / tps);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFinished, isPaused, isStarted, dispatch]);
}

function getRingWidth(element?: HTMLElement): [number, number] {
  const height = element?.clientHeight ?? window.innerHeight;
  const width = element?.clientWidth ?? window.innerWidth;

  if (window.matchMedia('(orientation: portrait)').matches) {
    return [width, width / 8];
  }

  return [height, height / 7.5];
}

/**
 * This hook is used to compute the size and thickness of the progress ring. It provides these values
 * along with an element ref that's used to compute the size and thickness and trigger recalculation.
 */
export function useTimerResizeEffect(
  debounceTime?: number
): [[number, number], RefObject<HTMLDivElement>] {
  const elementRef = useRef<HTMLDivElement>(null);
  const [ringWidth, setRingWidth] = useState(getRingWidth());
  const wait = debounceTime && debounceTime !== 0 ? Math.abs(debounceTime) : 10;
  const resize = (): void => {
    if (elementRef.current) {
      setRingWidth(getRingWidth(elementRef.current));
    }
  };

  useEffect(() => {
    const observer = new ResizeObserver(debounce(resize, wait));

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [setRingWidth]);

  return [ringWidth, elementRef];
}
