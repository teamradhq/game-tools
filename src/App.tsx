import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Flex, RingProgress, Text, Title, VisuallyHidden } from '@mantine/core';
import { IconClockPause, IconClockPlay, IconClockStop, IconRepeat } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { flip, pause, reset, start, tick } from './store/timerSlice.ts';

function HourGlassControls(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isStarted, isPaused, isFinished } = useAppSelector((state) => state.timer);

  return (
    <Box p="sm" my="xs">
      <Flex gap="sm" justify="center">
        <Button
          size="xl"
          color="green"
          title="Start"
          disabled={isStarted && !isPaused}
          onClick={() => {
            dispatch(start());
          }}
        >
          <IconClockPlay size={48} />
          <VisuallyHidden>Start</VisuallyHidden>
        </Button>
        <Button
          size="xl"
          color="red"
          title="Pause"
          disabled={!isStarted || (isStarted && isPaused)}
          onClick={() => {
            dispatch(pause());
          }}
        >
          <IconClockPause size={48} />
          <VisuallyHidden>Stop</VisuallyHidden>
        </Button>
        <Button
          size="xl"
          color="blue"
          title="Flip"
          disabled={!isStarted}
          onClick={() => {
            dispatch(flip());
          }}
        >
          <IconRepeat size={48} />
          <VisuallyHidden>Flip</VisuallyHidden>
        </Button>
        <Button
          size="xl"
          color="red.9"
          title="Reset"
          disabled={(!isStarted || (isStarted && !isPaused)) && !isFinished}
          onClick={() => {
            dispatch(reset());
          }}
        >
          <IconClockStop size={48} />
          <VisuallyHidden>Reset</VisuallyHidden>
        </Button>
      </Flex>
    </Box>
  );
}

function toMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
}

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { time, elapsed, isStarted, isPaused, isFinished } = useAppSelector((state) => state.timer);

  useEffect(() => {
    let interval: number | undefined;

    if (isStarted) {
      interval = setInterval(() => {
        console.log('tick');
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

  const progressColor = elapsed > time - time / 4 ? 'red' : 'green';

  return (
    <Flex
      justify="center"
      direction="column"
      style={{
        minHeight: '100svh',
      }}
    >
      <Flex justify="center">
        <RingProgress
          rootColor={progressColor}
          sections={[{ value: (elapsed / time) * 100, color: 'dark.8' }]}
          size={800}
          thickness={120}
          label={
            <Text c={`${progressColor}.4`} fw={900} ta="center" size="5rem">
              {toMinutesAndSeconds(time - elapsed)}
            </Text>
          }
        />
      </Flex>
      <HourGlassControls />
    </Flex>
  );
}

export default App;
