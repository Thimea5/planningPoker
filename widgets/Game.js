class Game {
    constructor(players, difficulty, rulesWidget, gameWidget) {
        this.startContainer = document.querySelector('#startContainer');
        this.gameContainer = document.querySelector('#game');
        this.searchContainer = document.querySelector('#searchGame');
        this.rulesWidget = rulesWidget;
        this.gameWidget = gameWidget;
        this.players = players;
        this.difficulty = difficulty;
        this.projectName = document.querySelector('#projectName');
        this.features = [];
        this.checkedFeatures = {};
        this.startBt = document.querySelector('#startBt');
        this.infoStart = document.querySelector('#infoStart');
        this.showPlayers = document.querySelector('#playersList'); 
    }

    // Affichage et gestion des fonctions
    start() {
        this.gameContainer.style.display = 'flex';
        this.searchContainer.style.display = 'none';
        this.startContainer.classList.add('play');
        document.querySelector('#difficulty').innerHTML = 'La partie est en mode <strong>' + this.difficulty + '</strong>. <span id="helpRules">Voir les règles.</span>';
        this.projectName.addEventListener('dblclick', () => this.renameProject());
        this.initFeaturesList();
        this.startBt.addEventListener('click', () => this.play());
        for (let i = 0; i < this.players.length; i++) {
            let playerItem = document.createElement('li');
            playerItem.textContent = this.players[i];
            this.showPlayers.appendChild(playerItem);
        }
        
    }

    renameProject() {
        this.projectName.innerHTML = prompt('Comment voulez-vous nommer votre projet ?');
    }

    // Permet d'afficher la liste des features
    initFeaturesList() {
        if (this.features.length !== 0) {
            this.startBt.style.display = 'block';
            this.infoStart.style.display = 'none';
        }
        this.featuresList = document.querySelector("#featuresList");
        while (this.featuresList.firstChild) {
            this.featuresList.removeChild(this.featuresList.firstChild);
        }
        for (let i = 0; i < this.features.length; i++) {
            this.featureItem = document.createElement('li');
            this.featureItem.textContent = this.features[i];
            this.featuresList.appendChild(this.featureItem);
        }
        this.newFeature = document.createElement('li');
        this.newFeature.textContent = "Ajouter une fonctionnalité";
        this.featuresList.appendChild(this.newFeature);
        this.newFeature.addEventListener('click', () => this.addFeature());
        console.log(this.features);
    }

    addFeature() {
        let newFeature = "";
        while (newFeature === "" || newFeature === null) {
            newFeature = prompt("Quelle fonctionnalité souhaitez-vous ajouter ?");
            if (newFeature === "" || newFeature === null) {
                alert("Veuillez entrer un nom de fonctionnalité valide");
            }
        }
        this.features.push(newFeature);
        this.checkedFeatures[newFeature] = false;
        this.initFeaturesList();
    }


    // Fonction qui gère le jeu
    // Fonction qui gère le jeu
play() {
    //variables pour cette fonction
    this.board = document.querySelector('#boardGame');
    this.actualPlayer = document.querySelector('#actualPlayer');
    this.cards = document.querySelector('#cards');
    this.actualFeature = document.querySelector('#actualFeature');
    this.res = {};
    this.cardsArray = [];

    //afficher/masquer les outils nécessaires à la partie
    this.board.style.display = 'block';
    this.cards.style.display = 'flex';
    this.startBt.style.display = 'none';

    for (let i = 0; i < this.cards.children.length; i++) {
        // Stocker chaque carte dans le tableau
       this.cardsArray.push(this.cards.children[i]);
    }

    // Initialisation de l'objet pour chaque joueur
    for (let i = 0; i < this.players.length; i++) {
        this.res[this.players[i]] = {}; // Initialisation de l'objet pour chaque joueur
    }

    //Chaque fonction est jouée par chaque joueur
    for (let j = 0; j < this.features.length; j++) {
        this.actualFeature.innerHTML = 'Fonctionnalité actuelle : ' + this.features[j];

        for (let i = 0; i < this.players.length; i++) {
            //on stocke le joueur actuel
            this.actualPlayer.innerHTML = `Au tour de ${this.players[i]}`;

            while (this.res[this.players[i]][this.actualFeature] === null || this.res[this.players[i]][this.actualFeature] === undefined) {
                //Ecouteur d'événement pour stocker le résultat de chaque joueur
                for (let k = 0; k < this.cardsArray.length; k++) {
                    this.cardsArray[k].addEventListener('click', (event) => {
                        this.res[this.players[i]][this.actualFeature] = event.target.id;
                        console.log(`${this.players[i]} a joué la carte ${this.res[this.players[i]][this.actualFeature]} pour la fonctionnalité ${this.actualFeature}`);
                    });
                }
            }
        }
        /*

        this.res = {};
        for (let i = 0; i < this.players.length; i++) {
            this.res[this.players[i]] = {}; // Initialisation de l'objet pour chaque joueur
        }

        for (let j = 0; j < this.features.length; j++) {
            this.actualFeature = this.features[j];
            this.showActualFeature.innerHTML = 'Fonctionnalité actuelle : ' + this.actualFeature;

            for (let i = 0; i < this.players.length; i++) {
                while (this.res[this.players[i]][this.actualFeature] === null || this.res[this.players[i]][this.actualFeature] === undefined) {
                    //on stock le joueur actuel
                    actualPlayer = this.players[i];
                    this.actualPlayer = actualPlayer;
                    console.log(`Au tour de ${this.players[i]}`);
                    let value = prompt(`Quelle carte souhaitez-vous jouer, ${this.players[i]} ?`);
                    this.res[this.players[i]][this.actualFeature] = value;
                }
                console.log(`${this.players[i]} a joué la carte ${this.res[this.players[i]][this.actualFeature]} pour la fonctionnalité ${this.actualFeature}`);
            }
        }

        */
       }
    }
}
