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
  Table,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { useDisclosure } from '@mantine/hooks';
import { Player } from '@src/store/scoreboardSlice.ts';
import { useAppSelector } from '@src/store/hooks.ts';

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

function GameDrawer(): React.JSX.Element {
  const [opened, { open, close }] = useDisclosure(false);
  const players = useAppSelector((state) => state.scoreboard.players);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Game Settings" size="xs">
        <Box py="sm">
          <Title order={3} mb="sm">
            Players
          </Title>
          <Flex direction="column" align="stretch">
            {players.map((player) => (
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
  const rounds = useAppSelector((state) => state.scoreboard.rounds);
  const players = useAppSelector((state) => state.scoreboard.players);

  return (
    <Layout title={'Scoreboard'}>
      <Flex align="stretch" style={{ minHeight: '70svh' }}>
        <GameDrawer />
        <Paper w="50%">
          <Title order={3} mb="sm">
            Scores
          </Title>
          <Table striped data-testid="gameScoreboard-table">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Round</Table.Th>

                {players.map((player) => (
                  <Table.Th key={player.name}>{player.name}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rounds.map((round, index) => (
                <Table.Tr key={index}>
                  <Table.Td ta="center">{index + 1}</Table.Td>
                  {round.map(({ score }, index) => (
                    <Table.Td ta="center" key={index}>
                      {score}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Th ta="center">Total</Table.Th>
                {players.map((player) => (
                  <Table.Th key={player.name} ta="center">
                    100
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Tfoot>
          </Table>
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
