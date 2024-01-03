import lodash from 'lodash';
import { MantineColor } from '@mantine/core';

/**
 * Represents a player in a game.
 */
export type Player = {
  /** The unique identifier of the player. */
  id: number;
  /** The order in which the player takes turns. */
  order: number;
  /** The name of the player. */
  name: string;
  /** The color associated with the player. */
  color: MantineColor;
};

/**
 * Represents a special score object.
 */
type SpecialScore = {
  /** The name of the score. */
  name: string;
  /** The value of the score. */
  value: number;
};

/**
 * Represents a player's score.
 */
type Score = {
  /** The ID of the player.*/
  playerId: number;
  /** The score of the player.*/
  score: number;
  /** An array of special scores achieved by the player.*/
  special?: SpecialScore[];
};

/**
 * Represents a round containing player scores.
 */
export type Round = Score[];

/**
 * Tally up special scores.
 *
 * @param special
 * @returns The total value of all special scores.
 */
function tallySpecialScores(special?: SpecialScore[]): number {
  return special?.reduce((acc, { value }) => acc + value, 0) || 0;
}

/**
 * Tally up the scores for a round.
 *
 * @param round
 */
function tallyRound(round: Round): Record<number, number> {
  return round.reduce(
    (totals, { playerId, score, special }): Record<number, number> => {
      if (!totals[playerId]) {
        totals[playerId] = 0;
      }

      totals[playerId] += score + (special ? tallySpecialScores(special) : 0);

      return totals;
    },
    {} as Record<number, number>
  );
}

/**
 * Tally up the scores for the provided rounds.
 *
 * @param rounds
 */
export function tallyScores(rounds: Round[]): Record<number, number> {
  let scores: Record<number, number> = {};

  for (const round of rounds) {
    const roundScores = tallyRound(round);
    scores = lodash.mergeWith({}, scores, roundScores, function (objValue, srcValue) {
      if (lodash.isNumber(objValue)) {
        return objValue + srcValue;
      }
    });
  }

  return scores;
}
