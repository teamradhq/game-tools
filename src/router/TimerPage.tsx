import React from 'react';
import { Container } from '@mantine/core';

import '../App.css';
import { GameTimer } from '@src/views/GameTimer.tsx';

export function TimerPage(): React.JSX.Element {
  return (
    <Container>
      <GameTimer />
    </Container>
  );
}
