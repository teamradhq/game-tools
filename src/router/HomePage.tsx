import React from 'react';
import { Flex, Grid, Paper, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHourglassHigh, IconScoreboard } from '@tabler/icons-react';
import { Layout } from '@src/Layout.tsx';

export function HomePage(): React.JSX.Element {
  return (
    <Layout title="Game Tools">
      <Grid columns={2}>
        <Grid.Col span={1}>
          <Paper component={Link} to="/game-timer" c="white">
            <Flex direction="column">
              <Title order={2}>Timer</Title>
              <IconHourglassHigh size={48} />
            </Flex>
          </Paper>
        </Grid.Col>
        <Grid.Col span={1}>
          <Paper component={Link} to="/game-scoreboard" c="white">
            <Flex direction="column">
              <Title order={2}>Scoreboard</Title>
              <IconScoreboard size={48} />
            </Flex>
          </Paper>
        </Grid.Col>
      </Grid>
    </Layout>
  );
}
