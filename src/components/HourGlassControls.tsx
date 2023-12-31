import React from 'react';
import { Box, Button, Flex, VisuallyHidden } from '@mantine/core';
import { IconClockPause, IconClockPlay, IconClockStop, IconRepeat } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { flip, pause, reset, start } from '@src/store/timerSlice.ts';

export function HourGlassControls(): React.JSX.Element {
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
