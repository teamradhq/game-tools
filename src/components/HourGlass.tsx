import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Flex, RingProgress, Text } from '@mantine/core';

import { useAppSelector } from '@src/store/hooks.ts';
import { toMinutesAndSeconds } from '@src/utils.ts';

function getProgressColor(elapsed: number, time: number): string {
  if (elapsed >= time - time / 4) {
    return 'red';
  }

  if (elapsed >= time - time / 2) {
    return 'yellow';
  }

  return 'green';
}

function getRingWidth(): [number, number] {
  if (window.matchMedia('(orientation: landscape)').matches) {
    const size = window.innerHeight - 200;
    const thickness = window.innerHeight / 10;

    return [window.innerHeight < size ? size : window.innerHeight - 100, thickness];
  }

  return [window.innerWidth, window.innerWidth / 10];
}

export function HourGlass(): React.JSX.Element {
  const elementRef = useRef(null);
  const { time, elapsed } = useAppSelector((state) => state.timer);
  const [[size, thickness], setRingWidth] = useState(getRingWidth());
  const progressColor = getProgressColor(elapsed, time);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new ResizeObserver(
      debounce(() => {
        setRingWidth(getRingWidth());
      }, 250)
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [setRingWidth]);

  return (
    <Flex justify="center" ref={elementRef}>
      <RingProgress
        rootColor={progressColor}
        sections={[{ value: (elapsed / time) * 100, color: 'dark.8' }]}
        size={size}
        thickness={thickness}
        label={
          <Text c={`${progressColor}.4`} fw={900} ta="center" size="5rem">
            {toMinutesAndSeconds(time - elapsed)}
          </Text>
        }
      />
    </Flex>
  );
}
