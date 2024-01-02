import React, { useState } from 'react';
import { Flex, NumberInput } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { fromMinutesAndSeconds, toMinutesAndSeconds } from '@src/utils.ts';
import { setTime } from '@src/store/timerSlice.ts';

const DEFAULT_TIME_INPUT_PROPS = {
  size: 'xs',
  w: 100,
};

type TimeInputProps = {
  size?: string;
  w?: number;
};

/**
 * Display input fields for the timer time in minutes and seconds.
 *
 * @constructor
 */
export function TimeInput(props: Readonly<TimeInputProps>): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { time, isStarted } = useAppSelector((state) => state.timer);
  const [[minutes, seconds], setNewTime] = useState(toMinutesAndSeconds(time));
  const size = props.size ?? DEFAULT_TIME_INPUT_PROPS.size;
  const w = props.w ?? DEFAULT_TIME_INPUT_PROPS.w;

  return (
    <Flex>
      <NumberInput
        label="Minutes"
        value={minutes}
        min={0}
        max={60}
        disabled={isStarted}
        onChange={(value) => {
          const m = Number(value);
          setNewTime([m, seconds]);
          dispatch(setTime(fromMinutesAndSeconds([m, seconds])));
        }}
        w={w}
        size={size}
      />
      <NumberInput
        label="Seconds"
        value={seconds}
        min={0}
        max={59}
        disabled={isStarted}
        onChange={(value) => {
          const s = Number(value);
          setNewTime([minutes, s]);
          dispatch(setTime(fromMinutesAndSeconds([minutes, s])));
        }}
        w={w}
        size={size}
      />
    </Flex>
  );
}
