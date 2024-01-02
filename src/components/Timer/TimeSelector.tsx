import React from 'react';
import { TimeInput } from '@src/components/Timer/TimeInput.tsx';
import { TimeOptions } from '@src/components/Timer/TimeOptions.tsx';
import { Flex } from '@mantine/core';

export function TimeSelector(): React.JSX.Element {
  return (
    <Flex align="center" dir="column">
      <TimeInput />
      <TimeOptions />
    </Flex>
  );
}
