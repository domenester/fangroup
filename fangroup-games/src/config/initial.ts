export const memoryGameInitialConfig = {
  "activateRegister": false,
  "timer": 0
}

export interface IScratchCard {
  amount: number;
  path: string;
  productName: string;
}

export const scratchGameInitialConfig = {
  "activateRegister": false,
  "difficulty": 80,
  "winOften": 1,
  "cardsOnTable": 4,
  "gamesPlayed": 0,
  "cards": []
};
