import React from 'react';
import { Flex, Paper, Title } from '@mantine/core';
import { Layout } from '@src/Layout.tsx';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { GameDrawer } from '@src/components/Scoreboard/GameDrawer.tsx';
import { ScoreTable } from '@src/components/Scoreboard/ScoreTable.tsx';

export function ScoreboardPage(): React.JSX.Element {
  return (
    <Layout title={'Scoreboard'}>
      <Flex align="stretch" style={{ minHeight: '70svh' }}>
        <GameDrawer />
        <Paper w="50%">
          <Title order={3} mb="sm">
            Scores
          </Title>
          <ScoreTable />
        </Paper>
        <Paper w="30%">
          <Title order={3} mb="sm">
            Summary
          </Title>
          <HourGlass />
        </Paper>
      </Flex>
    </Layout>
  );
}
