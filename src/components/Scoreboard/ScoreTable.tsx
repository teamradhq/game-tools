import React from 'react';
import { Table } from '@mantine/core';

import { useAppSelector } from '@src/store/hooks.ts';

export function ScoreTable(): React.JSX.Element {
  const rounds = useAppSelector((state) => state.scoreboard.rounds);
  const currentRound = useAppSelector((state) => state.scoreboard.currentRound);
  const players = useAppSelector((state) => state.scoreboard.players);
  const scores = useAppSelector((state) => state.scoreboard.scores);

  return (
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
        <Table.Tr>
          <Table.Td ta="center">{rounds.length + 1}</Table.Td>
          {currentRound.map(({ score }, index) => (
            <Table.Td ta="center" key={index}>
              {score}
            </Table.Td>
          ))}
          {Array(players.length - currentRound.length)
            .fill('-')
            .map((value, index) => (
              <Table.Td ta="center" key={index}>
                {value}
              </Table.Td>
            ))}
        </Table.Tr>
      </Table.Tbody>
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
    </Table>
  );
}
