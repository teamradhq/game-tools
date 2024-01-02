import React from 'react';
import { Box, Flex } from '@mantine/core';
import * as Buttons from '@src/components/Timer/ControlButtons.tsx';

export function HourGlassControls(): React.JSX.Element {
  return (
    <Box>
      <Flex>
        <Buttons.Start />
        <Buttons.Pause />
        <Buttons.Flip />
        <Buttons.Reset />
      </Flex>
    </Box>
  );
}
