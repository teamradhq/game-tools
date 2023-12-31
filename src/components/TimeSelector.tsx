import React, { useState } from 'react';
import { Flex, NumberInput } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setTime } from '@src/store/timerSlice.ts';
import { fromMinutesAndSeconds, toMinutesAndSeconds } from '@src/utils.ts';

export function TimeSelector(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { time, isStarted } = useAppSelector((state) => state.timer);
  const [[minutes, seconds], setNewTime] = useState(toMinutesAndSeconds(time));

  return (
    <Flex justify="center" gap="sm">
      <NumberInput
        label="Minutes"
        min={0}
        max={60}
        w={100}
        size="md"
        value={minutes}
        onChange={(value) => {
          const m = Number(value);
          setNewTime([m, seconds]);
          dispatch(setTime(fromMinutesAndSeconds([m, seconds])));
        }}
        disabled={isStarted}
      />
      <NumberInput
        label="Seconds"
        min={0}
        max={59}
        w={100}
        size="md"
        value={seconds}
        onChange={(value) => {
          const s = Number(value);
          setNewTime([minutes, s]);
          dispatch(setTime(fromMinutesAndSeconds([minutes, s])));
        }}
        disabled={isStarted}
      />
    </Flex>
  );
}
