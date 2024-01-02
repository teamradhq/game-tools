import React from 'react';
import { Flex } from '@mantine/core';
import * as Buttons from '@src/components/Timer/ControlButtons.tsx';

export function HourGlassControls(): React.JSX.Element {
  return (
    <Flex>
      <Buttons.Start />
      <Buttons.Pause />
      <Buttons.Flip />
      <Buttons.Reset />
    </Flex>
  );
}
