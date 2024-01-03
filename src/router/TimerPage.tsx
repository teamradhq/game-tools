import React from 'react';

import { GameTimer } from '@src/views/GameTimer.tsx';
import { Layout } from '@src/Layout.tsx';

export function TimerPage(): React.JSX.Element {
  return (
    <Layout>
      <GameTimer />
    </Layout>
  );
}
