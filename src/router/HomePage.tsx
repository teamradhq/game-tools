import React from 'react';
import { Box, Container, Flex, Grid, Paper, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHourglassHigh } from '@tabler/icons-react';

export function HomePage(): React.JSX.Element {
  return (
    <Container>
      <Box px="md" py="xl">
        <Title order={1}>Game Tools</Title>
      </Box>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <Paper component={Link} to="/game-timer" c="white">
            <Flex direction="column">
              <Title order={2}>Game Timer</Title>
              <IconHourglassHigh size={48} />
            </Flex>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
