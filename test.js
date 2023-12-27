// test.js

const Game = require('./widgets/Game.js');  

describe('Game class', () => {
  test('Initial state', () => {
    const game = new Game(['Player1', 'Player2'], 'Easy');
  });

  test('Resume method', () => {
    const game = new Game();
    game.resume(['Player1', 'Player2'], { feature1: false }, {}, 'Hard', 'ProjectName');
  });

});
