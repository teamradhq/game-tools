import React from 'react';
import { Container } from '@mantine/core';

import './App.css';
import { GameTimer } from '@src/views/GameTimer.tsx';

function App(): React.JSX.Element {
  return (
    <Container>
      <GameTimer />
    </Container>
  );
}

export default App;
