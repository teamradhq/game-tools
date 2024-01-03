import React from 'react';
import { Container, Flex, RingProgress, Text } from '@mantine/core';

import { useRunTimerEffect, useTimerControls, useTimerResizeEffect } from '@src/store/hooks.ts';
import { formatMinutesAndSeconds, getProgressColor } from '@src/utils';

type HourGlassProps = {
  ticksPerSecond?: number;
};

/**
 * The hourglass provides a visual representation of the current timer state.
 *
 * @param props
 * @constructor
 */
export function HourGlass(props: Readonly<HourGlassProps>): React.JSX.Element {
  const [{ time, elapsed, showTime, isStarted }] = useTimerControls();
  const progressColor = getProgressColor(elapsed, time);
  const [[size, thickness, textSize], elementRef] = useTimerResizeEffect();
  useRunTimerEffect(props.ticksPerSecond ?? 50);

  return (
    <Container ref={elementRef} data-testid="game-timer">
      <Flex justify="center" align="center" direction="column" h="60svh">
        <RingProgress
          rootColor={progressColor}
          sections={[{ value: (elapsed / time) * 100, color: 'dark.8' }]}
          size={size}
          thickness={thickness}
          label={
            (!isStarted || showTime) && (
              <Text c={`${progressColor}.4`} fw={900} ta="center" size={`${textSize}rem`}>
                {formatMinutesAndSeconds(time - elapsed)}
              </Text>
            )
          }
        />
      </Flex>
    </Container>
  );
}
