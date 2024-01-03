import React from 'react';
import { ColorSwatch, Flex, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { Layout } from '@src/Layout.tsx';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { GameDrawer } from '@src/components/Scoreboard/GameDrawer.tsx';
import { ScoreTable } from '@src/components/Scoreboard/ScoreTable.tsx';
import { useAppSelector } from '@src/store/hooks.ts';
import { Player } from '@src/utils';

type PlayerTotalProps = {
  player: Player;
  score: number;
  index: number;
};

type ScoreSwatchProps = {
  color: string;
  initials: string;
  value: number;
};

function ScoreSwatch(props: Readonly<ScoreSwatchProps>): React.JSX.Element {
  return (
    <ColorSwatch
      color={props.color}
      radius="sm"
      size={32}
      style={{
        width: '64px',
      }}
    >
      <Text ta="center" m={0} c={'dark.9'}>
        {props.initials[0]}
        {props.initials[props.initials.indexOf(' ') + 1]}: {props.value}
      </Text>
    </ColorSwatch>
  );
}

function PlayerTotal(props: Readonly<PlayerTotalProps>): React.JSX.Element {
  const theme = useMantineTheme();
  const { index, player, score } = props;

  return (
    <Flex
      data-testid="gameScoreboard-playerTotal"
      justify="stretch"
      bg={`dark.${(index % 2) + 8} `}
      my={0}
      px="sm"
      py="xs"
    >
      <ScoreSwatch
        color={theme.colors[player.color][4]}
        initials={player.name[player.name.indexOf(' ') + 1]}
        value={score}
      />
      <Text ta="center" fw={700} style={{ flex: '1 1 auto' }}>
        {player.name}
      </Text>
      <Text ta="right" m={0}>
        {score}
      </Text>
    </Flex>
  );
}

function GameTotal(): React.JSX.Element {
  const players = useAppSelector((state) => state.scoreboard.players);
  const scores = useAppSelector((state) => state.scoreboard.scores);
  const theme = useMantineTheme();

  return (
    <Flex
      direction="column"
      gap={0}
      align="stretch"
      style={{
        border: `1px solid ${theme.colors.dark[7]}`,
      }}
    >
      {players.map((player: Player, index: number) => (
        <PlayerTotal key={player.id} player={player} index={index} score={scores[player.id]} />
      ))}
    </Flex>
  );
}

function GameSummary(): React.JSX.Element {
  return (
    <>
      <GameTotal />
      <HourGlass />
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
          <ScoreTable />
        </Paper>
        <Paper w="30%">
          <Title order={3} mb="sm">
            Summary
          </Title>
          <GameSummary />
        </Paper>
      </Flex>
    </Layout>
  );
}
