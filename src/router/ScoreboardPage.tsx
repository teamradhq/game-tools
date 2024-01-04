import React, { useState } from 'react';
import {
  Box,
  Button,
  ColorSwatch,
  Divider,
  Flex,
  NumberInput,
  Paper,
  Switch,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { Layout } from '@src/Layout.tsx';
import { HourGlass } from '@src/components/Timer/HourGlass.tsx';
import { GameDrawer } from '@src/components/Scoreboard/GameDrawer.tsx';
import { ScoreTable } from '@src/components/Scoreboard/ScoreTable.tsx';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { Player, Score, tallyScore } from '@src/utils';
import { selectCurrentPlayer, updateCurrentRound } from '@src/store/scoreboardSlice.ts';

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
      <Text ta="center" fw={700} style={{ flex: '1 1 auto' }} className="player-name">
        {player.name}
      </Text>
      <Text ta="right" m={0} className="player-score">
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

const initialScore: Score = {
  playerId: 0,
  score: 0,
  special: [],
};

function CurrentRound(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const roundNumber = useAppSelector((state) => state.scoreboard.roundNumber);
  const order = useAppSelector((state) => state.scoreboard.order);
  const player = useAppSelector(selectCurrentPlayer);
  const [score, setScore] = useState<Score>({
    ...initialScore,
    playerId: player.id,
  });

  return (
    <Box>
      <Title order={4} mb="sm">
        Round {roundNumber}
      </Title>
      <Divider />
      <Flex justify="space-between">
        <Button color="blue" size="xs">
          <IconChevronLeft />
        </Button>
        <Text w="33%" size="sm">
          {order}: {player.name}
          <br /> ({tallyScore(score)} points)
        </Text>

        <NumberInput
          value={score.score}
          step={1}
          min={0}
          w="33%"
          onChange={(value) => {
            setScore({
              ...score,
              score: Number(value),
            });
          }}
        />
        <Switch
          label="Qwirkle"
          onChange={(event) => {
            if (event.currentTarget.checked) {
              setScore({
                ...score,
                special: [
                  {
                    name: 'Qwirkle',
                    value: 6,
                  },
                ],
              });
            } else {
              setScore({
                ...score,
                special: [],
              });
            }
          }}
        />
        <Button
          color="green"
          size="xs"
          onClick={() => {
            dispatch(updateCurrentRound(score));
            setScore(initialScore as Score);
          }}
        >
          <IconChevronRight />
        </Button>
      </Flex>
      <Divider />
    </Box>
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
          <CurrentRound />
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
