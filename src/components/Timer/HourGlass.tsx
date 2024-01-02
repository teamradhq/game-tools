import React from 'react';
import { Flex, RingProgress, Text } from '@mantine/core';

import { useRunTimerEffect, useTimerControls, useTimerResizeEffect } from '@src/store/hooks.ts';
import { formatMinutesAndSeconds } from '@src/utils.ts';

function getProgressColor(elapsed: number, time: number): string {
  if (elapsed >= time - time / 4) {
    return 'red';
  }

  if (elapsed >= time - time / 2) {
    return 'yellow';
  }

  return 'green';
}

type HourGlassProps = {
  ticksPerSecond?: number;
};

export function HourGlass(props: Readonly<HourGlassProps>): React.JSX.Element {
  const [{ time, elapsed, showTime, isStarted }] = useTimerControls();
  const progressColor = getProgressColor(elapsed, time);
  const [[size, thickness], elementRef] = useTimerResizeEffect();
  useRunTimerEffect(props.ticksPerSecond ?? 50);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      ref={elementRef}
      style={{ height: '77.5svh' }}
    >
      <RingProgress
        rootColor={progressColor}
        sections={[{ value: (elapsed / time) * 100, color: 'dark.8' }]}
        size={size}
        thickness={thickness}
        label={
          (!isStarted || showTime) && (
            <Text c={`${progressColor}.4`} fw={900} ta="center" size="5rem">
              {formatMinutesAndSeconds(time - elapsed)}
            </Text>
          )
        }
      />
    </Flex>
  );
}
