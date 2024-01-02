import React from 'react';
import { Flex, Paper } from '@mantine/core';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { TimeSelector } from '@src/components/Timer/TimeSelector.tsx';
import { HourGlassControls } from '@src/components/Timer/HourGlassControls.tsx';

export function GameTimer(): React.JSX.Element {
  return (
    <Flex
      direction="column"
      style={{
        minHeight: '100svh',
      }}
    >
      <Paper h="75svh">
        <HourGlass />
      </Paper>
      <Paper h="20svh">
        <HourGlassControls />
        <TimeSelector />
      </Paper>
    </Flex>
  );
}
