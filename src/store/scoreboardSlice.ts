import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Round, tallyScores } from '@src/utils';

export type ScoreboardState = {
  players: Player[];
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
    { playerId: 4, score: 6, special: [{ name: 'Quirkle', value: 12 }] },
  ],
  [
    { playerId: 1, score: 4 },
    { playerId: 2, score: 6, special: [{ name: 'Quirkle', value: 12 }] },
    { playerId: 3, score: 3 },
    { playerId: 4, score: 5 },
  ],
];

function initialState(): ScoreboardState {
  return {
    started: null,
    ended: null,
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
    addRound: (state, action: PayloadAction<Round>) => {
      state.rounds.push(action.payload);
      state.scores = tallyScores(state.rounds);
    },
  },
});

export const { startGame, endGame, addRound } = scoreboardSlice.actions;

export default scoreboardSlice.reducer;
