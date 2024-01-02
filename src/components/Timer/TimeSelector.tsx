import React, { useState } from 'react';
import { Checkbox, Flex, NumberInput } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setShowTime, setTime } from '@src/store/timerSlice.ts';
import { fromMinutesAndSeconds, toMinutesAndSeconds } from '@src/utils.ts';

const DIMENSIONS = {
  size: 'xs',
  w: 100,
};

export function TimeSelector(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { time, isStarted, showTime } = useAppSelector((state) => state.timer);
  const [[minutes, seconds], setNewTime] = useState(toMinutesAndSeconds(time));

  return (
    <>
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
          w={DIMENSIONS.w}
          size={DIMENSIONS.size}
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
          w={DIMENSIONS.w}
          size={DIMENSIONS.size}
        />
      </Flex>
      <Flex>
        <Checkbox
          label="Show Time"
          checked={showTime}
          size={DIMENSIONS.size}
          onChange={(event) => {
            dispatch(setShowTime(event.currentTarget.checked));
          }}
        />
      </Flex>
    </>
  );
}
