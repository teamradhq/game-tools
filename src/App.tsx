import React, { useEffect } from 'react';
import { Flex } from '@mantine/core';

import './App.css';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { tick } from '@src/store/timerSlice.ts';
import { HourGlassControls } from '@src/components/HourGlassControls.tsx';
import { HourGlass } from '@src/components/HourGlass.tsx';
import { TimeSelector } from '@src/components/TimeSelector.tsx';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isStarted, isPaused, isFinished } = useAppSelector((state) => state.timer);

  useEffect(() => {
    let interval: number | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        if (isStarted && !isPaused && !isFinished) {
          dispatch(tick());
        }

        if (isFinished) {
          clearInterval(interval);
        }
      }, 1000);
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

export default App;
