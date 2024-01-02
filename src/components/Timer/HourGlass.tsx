import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Flex, RingProgress, Text } from '@mantine/core';

import { useAppSelector } from '@src/store/hooks.ts';
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

function getRingWidth(element?: HTMLElement): [number, number] {
  const height = element?.clientHeight ?? window.innerHeight;
  const width = element?.clientWidth ?? window.innerWidth;

  if (window.matchMedia('(orientation: portrait)').matches) {
    return [width, width / 8];
  }

  return [height, height / 7.5];
}

export function HourGlass(): React.JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);
  const { time, elapsed, showTime, isStarted } = useAppSelector((state) => state.timer);
  const [[size, thickness], setRingWidth] = useState(getRingWidth());
  const progressColor = getProgressColor(elapsed, time);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new ResizeObserver(
      debounce(() => {
        if (elementRef.current) {
          setRingWidth(getRingWidth(elementRef.current));
        }
      }, 10)
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
