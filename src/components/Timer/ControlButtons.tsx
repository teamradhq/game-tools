import React from 'react';

import { useTimerControls } from '@src/store/hooks.ts';
import { flip, pause, reset, start } from '@src/store/timerSlice.ts';

import { IconClockPause, IconClockPlay, IconClockStop, IconRepeat } from '@tabler/icons-react';
import { ControlButton } from '@src/components/Utils/ControlButton.tsx';

export function Start(): React.JSX.Element {
  const [{ isStarted, isPaused }, dispatch] = useTimerControls(start);

  return (
    <ControlButton
      title="Start"
      disabled={isStarted && !isPaused}
      onClick={dispatch}
      Icon={IconClockPlay}
      color="green"
    />
  );
}

export function Pause(): React.JSX.Element {
  const [{ isStarted, isPaused, isFinished }, dispatch] = useTimerControls(pause);

  return (
    <ControlButton
      title="Pause"
      disabled={!isStarted || (isStarted && isPaused) || isFinished}
      onClick={dispatch}
      Icon={IconClockPause}
      color="red"
    />
  );
}

export function Flip(): React.JSX.Element {
  const [{ isStarted, isFinished }, dispatch] = useTimerControls(flip);

  return (
    <ControlButton
      title="Flip"
      disabled={!isStarted || isFinished}
      onClick={dispatch}
      Icon={IconRepeat}
      color="blue"
    />
  );
}

export function Reset(): React.JSX.Element {
  const [{ isStarted, isPaused, isFinished }, dispatch] = useTimerControls(reset);

  return (
    <ControlButton
      title="Reset"
      disabled={(!isStarted || (isStarted && !isPaused)) && !isFinished}
      onClick={dispatch}
      Icon={IconClockStop}
      color="red.9"
    />
  );
}
