import React from 'react';
import { Container, Paper, Title } from '@mantine/core';

export function HomePage(): React.JSX.Element {
  return (
    <Container>
      <Title order={1}>Game Tools</Title>
      <Paper>
        <Title order={2}>Game Timer</Title>
        <p>
          A timer that can be used for any game. It has a built-in stopwatch and countdown timer.
        </p>
      </Paper>
    </Container>
  );
}
