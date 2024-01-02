import React from 'react';
import { Box } from '@mantine/core';

import './App.css';
import { GameTimer } from '@src/views/GameTimer.tsx';

function App(): React.JSX.Element {
  return (
    <Box className="App">
      <GameTimer />
    </Box>
  );
}

export default App;
