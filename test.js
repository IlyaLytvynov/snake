const Game = require('./public/game');

describe('Game', () => {
  it('Should create instance of game', () => {
    const game = new Game();

    expect(game).not.toBe(undefined);
  })
});