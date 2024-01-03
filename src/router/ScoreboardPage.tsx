import React from 'react';

import { Layout } from '@src/Layout.tsx';
import { Button, Flex, List, Paper, Title, VisuallyHidden } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';

export function ScoreboardPage(): React.JSX.Element {
  return (
    <Layout title={'Scoreboard'}>
      <Flex align="stretch" style={{ minHeight: '70svh' }}>
        <Paper w="20%" style={{ position: 'relative' }}>
          <Title order={3} mb="sm">
            Players
          </Title>
          <List type="ordered">
            <List.Item data-testid="player-name">Player 1</List.Item>
            <List.Item data-testid="player-name">Player 2</List.Item>
            <List.Item data-testid="player-name">Player 3</List.Item>
            <List.Item data-testid="player-name">Player 4</List.Item>
          </List>
          <Button
            size="xs"
            px="xs"
            color="green"
            title="Edit Players"
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          >
            <IconPencil size="20" />
            <VisuallyHidden>Edit Players</VisuallyHidden>
          </Button>
        </Paper>
        <Paper w="50%">
          <Title order={3} mb="sm">
            Scores
          </Title>
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
