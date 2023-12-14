class Game {
    constructor(players, difficulty) {
        this.players = players;
        this.difficulty = difficulty;
    }

    start() {
        console.log(`Starting game with ${this.players.length} players and difficulty ${this.difficulty}`);
        // Add your game logic here
    }
}

const players = ['Player 1', 'Player 2', 'Player 3'];
const difficulty = 'Hard';

