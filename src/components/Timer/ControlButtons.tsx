import React from 'react';
import { useTimerControls } from '@src/store/hooks.ts';
import { flip, pause, reset, start } from '@src/store/timerSlice.ts';
import { Button, VisuallyHidden } from '@mantine/core';
import { IconClockPause, IconClockPlay, IconClockStop, IconRepeat } from '@tabler/icons-react';

const DIMENSIONS = {
  size: 'md',
  icon: 36,
};

export function Start(): React.JSX.Element {
  const [{ isStarted, isPaused }, dispatch] = useTimerControls(start);

  return (
    <Button
      size={DIMENSIONS.size}
      color="green"
      title="Start"
      disabled={isStarted && !isPaused}
      onClick={dispatch}
    >
      <IconClockPlay size={DIMENSIONS.icon} />
      <VisuallyHidden>Start</VisuallyHidden>
    </Button>
  );
}

export function Pause(): React.JSX.Element {
  const [{ isStarted, isPaused, isFinished }, dispatch] = useTimerControls(pause);

  return (
    <Button
      size={DIMENSIONS.size}
      color="red"
      title="Pause"
      disabled={!isStarted || (isStarted && isPaused) || isFinished}
      onClick={dispatch}
    >
      <IconClockPause size={DIMENSIONS.icon} />
      <VisuallyHidden>Pause</VisuallyHidden>
    </Button>
  );
}

export function Flip(): React.JSX.Element {
  const [{ isStarted, isFinished }, dispatch] = useTimerControls(flip);

  return (
    <Button
      size={DIMENSIONS.size}
      color="blue"
      title="Flip"
      disabled={!isStarted || isFinished}
      onClick={dispatch}
    >
      <IconRepeat size={DIMENSIONS.icon} />
      <VisuallyHidden>Flip</VisuallyHidden>
    </Button>
  );
}

export function Reset(): React.JSX.Element {
  const [{ isStarted, isPaused, isFinished }, dispatch] = useTimerControls(reset);

  return (
    <Button
      size={DIMENSIONS.size}
      color="red.9"
      title="Reset"
      disabled={(!isStarted || (isStarted && !isPaused)) && !isFinished}
      onClick={dispatch}
    >
      <IconClockStop size={DIMENSIONS.icon} />
      <VisuallyHidden>Reset</VisuallyHidden>
    </Button>
  );
}
