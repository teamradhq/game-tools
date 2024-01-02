import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { tick } from '@src/store/timerSlice.ts';
import { Flex } from '@mantine/core';
import { HourGlass } from '@src/components/HourGlass.tsx';
import { TimeSelector } from '@src/components/TimeSelector.tsx';
import { HourGlassControls } from '@src/components/HourGlassControls.tsx';

export function GameTimer(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isStarted, isPaused, isFinished } = useAppSelector((state) => state.timer);

  useEffect(() => {
    let interval: number | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        if (isStarted && !isPaused && !isFinished) {
          dispatch(tick(1 / 50));
        }

        if (isFinished) {
          clearInterval(interval);
        }
      }, 1000 / 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFinished, isPaused, isStarted, dispatch]);

  return (
    <Flex
      justify="center"
      direction="column"
      style={{
        minHeight: '100svh',
      }}
    >
      <HourGlass />
      <TimeSelector />
      <HourGlassControls />
    </Flex>
  );
}
