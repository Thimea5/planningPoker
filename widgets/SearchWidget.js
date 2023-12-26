class SearchWidget {
    constructor() {
        this.players = [];
        this.features = {};
        this.res = {};
        this.difficulty = '';
        this.name = '';

        this.searchSelect = document.querySelector("#gameList");
        this.btReset = document.querySelector("#resetGameList");
        this.btReset.addEventListener('click', () => this.resetGameList());
        this.btPlayOldGame = document.querySelector("#playOldGame");
        this.btPlayOldGame.addEventListener('click', () => this.playOldGame());
    }


    searchGame(){
        // Obtenez toutes les clés du localStorage
        const allKeys = Object.keys(localStorage);

        // Itérez sur chaque clé pour récupérer l'objet associé
        allKeys.forEach(key => {
            const storedObject = JSON.parse(localStorage.getItem(key));
            let gameItem = document.createElement('option');
            gameItem.textContent = storedObject.name;
            this.searchSelect.appendChild(gameItem);
        });

        if (allKeys.length === 0) {
            let gameItem = document.createElement('option');
            gameItem.textContent = 'No games found';
            this.searchSelect.appendChild(gameItem);   
        }
    }

     
     resetGameList() { // Fonction pour réinitialiser la liste dans le stockage local
        localStorage.clear();
        console.log('La liste des projets a été réinitialisée.');

        //recharger la page
        window.location.reload();
    }

    playOldGame() { // Fonction pour jouer à un ancien jeu
        let selectedGame = this.searchSelect.value;

        selectedGame = localStorage.getItem(selectedGame);
        selectedGame = JSON.parse(selectedGame);

        this.res = selectedGame.res;
        this.players = selectedGame.players;
        this.features = selectedGame.features;
        this.difficulty = selectedGame.difficulty;
        this.name = selectedGame.name;

        const game = new Game();
        game.resume(this.players, this.features, this.res, this.difficulty, this.name);

    }
}
