import React from 'react';
import { Table } from '@mantine/core';

import { useAppSelector } from '@src/store/hooks.ts';
import { Round, Score, tallyScore } from '@src/utils';

/**
 * Display a tallied score, providing a mark if any special scores are present.
 *
 * @param score
 * @constructor
 */
function ShowScore({ score }: { score: Score }): React.JSX.Element {
  return (
    <>
      {tallyScore(score)}
      {(score?.special?.length ?? 0) > 0 && '*'}
    </>
  );
}

/**
 * Display a header row for a player table.
 *
 * @constructor
 */
function ScoreTableHeader(): React.JSX.Element {
  const players = useAppSelector((state) => state.scoreboard.players);

  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Round</Table.Th>
        {players.map((player) => (
          <Table.Th key={player.name}>{player.name}</Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
}

/**
 * Display a round of scores in a table row.
 *
 * @param props
 * @constructor
 */
function RoundRow(props: { round: Round; roundNumber: number }): React.JSX.Element {
  const playerCount = useAppSelector((state) => state.scoreboard.players.length);
  const data = [...props.round, ...Array(playerCount - props.round.length).fill('-')];

  return (
    <Table.Tr>
      <Table.Td ta="center">{props.roundNumber}</Table.Td>
      {data.map((score, index) => (
        <Table.Td ta="center" key={index}>
          {(score !== '-' && <ShowScore score={score} />) || '-'}
        </Table.Td>
      ))}
    </Table.Tr>
  );
}

/**
 * Render the body of the score table.
 *
 * @constructor
 */
function ScoreTableBody(): React.JSX.Element {
  const rounds = useAppSelector((state) => state.scoreboard.rounds);
  const currentRound = useAppSelector((state) => state.scoreboard.currentRound);

  return (
    <Table.Tbody>
      {rounds.map((round, index) => (
        <RoundRow key={index} round={round} roundNumber={index + 1} />
      ))}
      <RoundRow round={currentRound} roundNumber={rounds.length + 1} />
    </Table.Tbody>
  );
}

/**
 * Display the score totals for each player.
 *
 * @constructor
 */
function ScoreTableFooter(): React.JSX.Element {
  const players = useAppSelector((state) => state.scoreboard.players);
  const scores = useAppSelector((state) => state.scoreboard.scores);

  return (
    <Table.Tfoot>
      <Table.Tr>
        <Table.Th ta="center">Total</Table.Th>
        {players.map((player) => (
          <Table.Th key={player.name} ta="center">
            {scores[player.id] || 0}
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Tfoot>
  );
}

/**
 * Display each game round's scores in a table.
 *
 * @constructor
 */
export function ScoreTable(): React.JSX.Element {
  return (
    <Table striped data-testid="gameScoreboard-table">
      <ScoreTableHeader />
      <ScoreTableBody />
      <ScoreTableFooter />
    </Table>
  );
}
