import React from 'react';
import { Affix, Button, Container, VisuallyHidden } from '@mantine/core';

import '../App.css';
import { GameTimer } from '@src/views/GameTimer.tsx';
import { Link } from 'react-router-dom';
import { IconHome } from '@tabler/icons-react';

function HomeLink(): React.JSX.Element {
  return (
    <Affix>
      <Button component={Link} to="/" color="green" m="sm" title="Home">
        <VisuallyHidden>Home Page</VisuallyHidden>
        <IconHome />
      </Button>
    </Affix>
  );
}

export function TimerPage(): React.JSX.Element {
  return (
    <>
      <Container>
        <GameTimer />
      </Container>
      <HomeLink />
    </>
  );
}
