import React, { useState } from 'react';
import { Checkbox, Flex, NumberInput } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setShowTime, setTime } from '@src/store/timerSlice.ts';
import { fromMinutesAndSeconds, toMinutesAndSeconds } from '@src/utils.ts';

export function TimeSelector(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { time, isStarted, showTime } = useAppSelector((state) => state.timer);
  const [[minutes, seconds], setNewTime] = useState(toMinutesAndSeconds(time));

  return (
    <>
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
      <Flex justify="center" gap="sm" mt="sm">
        <Checkbox
          label="Show Time"
          checked={showTime}
          onChange={(event) => {
            dispatch(setShowTime(event.currentTarget.checked));
          }}
        />
      </Flex>
    </>
  );
}
