import React from 'react';
import { Affix, Button, VisuallyHidden } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconHome } from '@tabler/icons-react';

export function HomeLink(): React.JSX.Element {
  const location = useLocation();

  if (location.pathname === '/') {
    return <></>;
  }

  return (
    <Affix>
      <Button component={Link} to="/" color="green" m="sm" title="Home">
        <VisuallyHidden>Home Page</VisuallyHidden>
        <IconHome />
      </Button>
    </Affix>
  );
}
