import React from 'react';
import { Checkbox, Flex } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setShowTime } from '@src/store/timerSlice.ts';

const DEFAULT_TIME_OPTIONS_PROPS = {
  size: 'xs',
};

type TimeOptionsProps = {
  size?: string;
};

export function TimeOptions(props: Readonly<TimeOptionsProps>): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { showTime } = useAppSelector((state) => state.timer);
  const size = props.size ?? DEFAULT_TIME_OPTIONS_PROPS.size;

  return (
    <Flex align="center">
      <Checkbox
        label="Show Time"
        checked={showTime}
        size={size}
        onChange={(event) => {
          dispatch(setShowTime(event.currentTarget.checked));
        }}
        data-testid="timeOptions-showTime"
      />
    </Flex>
  );
}
