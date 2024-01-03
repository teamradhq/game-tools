import React from 'react';

import { Layout } from '@src/Layout.tsx';
import {
  Affix,
  Box,
  Button,
  Drawer,
  Flex,
  Paper,
  Title,
  Text,
  VisuallyHidden,
  MantineColor,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { useDisclosure } from '@mantine/hooks';

type Player = {
  order: number;
  name: string;
  color: MantineColor;
};

function PlayerSetting(props: Readonly<Player>): React.JSX.Element {
  return (
    <Paper bg="black" px={8} py={4} data-testid="player-setting">
      <Flex align="center" py={0} my={0}>
        <Flex
          w="24"
          h="24"
          gap={0}
          p={0}
          my={4}
          bg={props.color}
          c="black"
          style={(theme) => {
            return {
              borderRadius: theme.radius.md,
            };
          }}
        >
          {props.order}
        </Flex>
        <Box m={0} style={{ flex: '1 1 auto' }}>
          <Text fs="24">{props.name}</Text>
        </Box>
      </Flex>
    </Paper>
  );
}

function mockPlayers(): Player[] {
  return [
    { order: 1, name: 'Player 1', color: 'pink' },
    { order: 2, name: 'Player 2', color: 'blue' },
    { order: 3, name: 'Player 3', color: 'orange' },
    { order: 4, name: 'Player 4', color: 'lime' },
  ];
}

function GameDrawer(): React.JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Game Settings" size="xs">
        <Box py="sm">
          <Title order={3} mb="sm">
            Players
          </Title>
          <Flex direction="column" align="stretch">
            {mockPlayers().map((player) => (
              <PlayerSetting key={player.name} {...player} />
            ))}
          </Flex>
        </Box>
      </Drawer>
      {!opened && (
        <Affix position={{ top: '1rem', left: '1rem' }}>
          <Button
            title="Game Settings"
            onClick={open}
            color="green"
            data-testId="gameScoreboard-settingsButton"
          >
            <IconSettings />
            <VisuallyHidden>Game Settings</VisuallyHidden>
          </Button>
        </Affix>
      )}
    </>
  );
}

export function ScoreboardPage(): React.JSX.Element {
  return (
    <Layout title={'Scoreboard'}>
      <Flex align="stretch" style={{ minHeight: '70svh' }}>
        <GameDrawer />
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
