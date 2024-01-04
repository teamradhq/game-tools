import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Round, Score, tallyScores } from '@src/utils';
import { RootState } from '@src/store/index.ts';

export type ScoreboardState = {
  players: Player[];
  roundNumber: number;
  order: number;
  currentRound: Round;
  rounds: Round[];
  scores: Record<number, number>;
  started: Date | null;
  ended: Date | null;
};

const rounds = [
  [
    { playerId: 1, score: 2 },
    { playerId: 2, score: 3 },
    { playerId: 3, score: 3 },
    { playerId: 4, score: 2 },
  ],
  [
    { playerId: 1, score: 4 },
    { playerId: 2, score: 2 },
    { playerId: 3, score: 5 },
    { playerId: 4, score: 6, special: [{ name: 'Qwirkle', value: 12 }] },
  ],
  [
    { playerId: 1, score: 4 },
    { playerId: 2, score: 6, special: [{ name: 'Qwirkle', value: 12 }] },
    { playerId: 3, score: 3 },
    { playerId: 4, score: 5 },
  ],
];

function initialState(): ScoreboardState {
  return {
    started: null,
    ended: null,
    roundNumber: 1,
    order: 1,
    currentRound: [],
    players: [
      { order: 1, id: 1, name: 'Player 1', color: 'blue' },
      { order: 2, id: 2, name: 'Player 2', color: 'red' },
      { order: 3, id: 3, name: 'Player 3', color: 'green' },
      { order: 4, id: 4, name: 'Player 4', color: 'yellow' },
    ],
    rounds,
    scores: tallyScores(rounds),
  };
}

export const scoreboardSlice = createSlice({
  name: 'Scoreboard',
  initialState: initialState(),
  reducers: {
    startGame: (state) => {
      state.started = new Date();
    },
    endGame: (state) => {
      if (!state.started) {
        return;
      }

      state.ended = new Date();
    },
    updateCurrentRound(state, action: PayloadAction<Score>) {
      state.currentRound.push(action.payload);

      if (state.currentRound.length !== state.players.length) {
        state.order = state.order + 1;
      } else {
        state.order = 1;
        state.roundNumber = state.roundNumber + 1;
        state.rounds.push(state.currentRound);
        state.currentRound = [];
      }

      state.scores = tallyScores([state.currentRound, ...state.rounds]);
    },
  },
});

export const { startGame, endGame, updateCurrentRound } = scoreboardSlice.actions;

export function selectCurrentPlayer(state: RootState): Player {
  return (
    state.scoreboard.players.find((player) => player.order === state.scoreboard.order) ||
    state.scoreboard.players[0]
  );
}

export default scoreboardSlice.reducer;
