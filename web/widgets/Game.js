class Game {
    constructor(players, difficulty, rulesWidget, gameWidget) {
        this.rulesWidget = rulesWidget;
        this.gameWidget = gameWidget;
        this.players = players;
        this.difficulty = difficulty;
        this.removeGameWidget();
    }

    start() {
        console.log(`Starting game with ${this.players.length} players and difficulty ${this.difficulty}`);
        // Add your game logic here
        let rounds = {};


        for(let i=0; i<this.players.length; i++){
            while(true){
            console.log('Au tour de' + this.players[i]);
            }
        }
    }

    removeGameWidget(){
        delete this.rulesWidget;
        delete this.gameWidget;

        const rulesWidgetElement = document.querySelector('.containerRulesWidget');
        const gameWidgetElement = document.querySelector('.containerGameWidget');

        if (rulesWidgetElement) {
            rulesWidgetElement.remove();
        }

        if (gameWidgetElement) {
            gameWidgetElement.remove();
        }
        // Vérifiez si les instances ont été supprimées
        if (this.rulesWidget === undefined && this.gameWidget === undefined) {
            console.log("Les instances ont été supprimées avec succès.");
            
        } else {
            console.log("Les instances existent toujours.");
        }
    }
    }


