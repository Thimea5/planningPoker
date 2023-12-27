//La classe Game représente le jeu principal.
//@class
class Game {
    //@constructor
    constructor(players="", difficulty="") {
        this.startContainer = document.querySelector('#startContainer');
        this.gameContainer = document.querySelector('#game');
        this.searchContainer = document.querySelector('#searchGame');
        //@param {Array} players - Liste des joueurs.
        this.players = players;
        //@param {string} difficulty - Niveau de difficulté du jeu.
        this.difficulty = difficulty;
        this.projectName = document.querySelector('#projectName');
        //@param {Object} features - Liste des fonctionnalités.
        this.features = {};
        this.startBt = document.querySelector('#startBt');
        this.infoStart = document.querySelector('#infoStart');
        this.showPlayers = document.querySelector('#playersList'); 
        this.divPlayers = document.querySelector('#players');
        //@param {Object} res - Résultats des joueurs.
        this.res = {};
        this.board = document.querySelector('#boardGame');
        this.actualPlayer = document.querySelector('#actualPlayer');
        this.cards = document.querySelector('#cards');
        this.divActualFeature = document.querySelector('#actualFeature');
        this.actualFeature = "";
        this.imgSrc = "";
        this.currentPlayer = "";
        this.divPlayer = [];
        this.restartFeatureInfo = document.querySelector('#restartFeature');
        this.btRestartFeature = document.querySelector('#btRestartFeature');
        this.resultat = document.querySelector('#resultat');
    }


    // Fonction pour charger une partie à partir du stockage local
    resume(nplayers, nfeature, nres, ndifficulty, nname) {
        try {
            let rulesWidget = document.querySelector('.containerRulesWidget');
            let gameWidget = document.querySelector('.containerGameWidget');
            rulesWidget.style.display = 'none';
            gameWidget.style.display = 'none';

            // Ajout des tests sur les valeurs passées
            if (!nname || !nplayers || !ndifficulty) {
                throw new Error("Paramètres manquants");
            }

            this.projectName.innerHTML = nname;
            this.players = nplayers;
            this.features = nfeature;
            this.res = nres;
            this.difficulty = ndifficulty;

            let featuresArray = Object.keys(this.features);
            let allFeaturesTrue = featuresArray.every(feature => this.features[feature]);

            if (allFeaturesTrue) {
                // Afficher les résultats
                this.start();
                this.showResult();
            } else {
                this.start();
            }
        } catch (error) {
            console.error("Erreur lors de la reprise de la partie:", error);
        }
    }

    // Affichage et gestion des fonctions
    start() {
        this.gameContainer.style.display = 'flex';
        this.searchContainer.style.display = 'none';
        this.startContainer.classList.add('play');
        document.querySelector('#difficulty').innerHTML = 'La partie est en mode <strong>' + this.difficulty + '</strong>. <span id="helpRules">Voir les règles.</span>';
        this.projectName.addEventListener('dblclick', () => this.renameProject());
        this.initFeaturesList();
        for (let i = 0; i < this.players.length; i++) {
            let playerItem = document.createElement('li');
            playerItem.textContent = this.players[i];
            this.showPlayers.appendChild(playerItem);
        }

        for (let i = 0; i < this.players.length; i++) {
            let playerDiv = document.createElement('div');
            let playerName = document.createElement('p');
            let playerImg = document.createElement('img');

            playerName.textContent = 'Choix de ' + this.players[i];
            playerDiv.id = this.players[i];

            playerDiv.appendChild(playerName);
            playerDiv.appendChild(playerImg);
            this.divPlayers.appendChild(playerDiv);
        }

        //Démarrer la partie lors du clic sur start
        this.startBt.addEventListener('click', () => this.play());
    }

    // Fonction pour créer une Promise qui attend le clic sur une carte
    waitForCardClick() {
        this.cardsArray = Array.from(this.cards.children);
        return new Promise(resolve => {
            // Fonction de gestionnaire d'événements pour une carte spécifique
            this.clickHandler = (event) => {
                this.res[this.currentPlayer][this.actualFeature] = event.currentTarget.id;
                this.imgSrc = event.currentTarget.src;
                resolve(); // Résoudre la Promise une fois que le clic a eu lieu
            };
    
            // Ajouter un seul écouteur d'événements à chaque carte
            this.cardsArray.forEach(card => {
                card.addEventListener('click', this.clickHandler, { once: true });
            });
        });
    }

    // Fonction asynchrone qui gère le tour de chaque joueur
    async playerRound() {
        this.actualPlayer.innerHTML = `A ton tour <strong>${this.currentPlayer}</strong> ! `;
        // Attendre que le joueur clique sur une carte
        await this.waitForCardClick();
    }

    async play() {
        this.board.style.display = 'block';
        this.cards.style.display = 'flex';
        this.startBt.style.display = 'none';
        this.divPlayers.style.display = 'flex';
        this.divPlayer = document.querySelectorAll('#players div');
    
        for (let feature in this.features) {
            if (this.features.hasOwnProperty(feature) && !this.features[feature]) {
                this.actualFeature = feature;
                this.divActualFeature.innerHTML = 'Fonctionnalité actuelle : ' + this.actualFeature;
                
                this.resetPlayersChoice();
                await this.playForFeature();
            }
        }
    }

    checkFeaturesAndShowResult() {
        const featuresArray = Object.keys(this.features);

        // Vérifier si toutes les fonctionnalités sont à true
        const allFeaturesTrue = featuresArray.every(feature => this.features[feature]);


        if (allFeaturesTrue) {
            // Afficher les résultats
            this.showResult();
            this.saveResToJson();
            
        }
    }

    async playForFeature() {
        let allPlayersSameCard = false;
    
        while (!allPlayersSameCard) {
            // Réinitialiser les résultats du tour précédent
            //this.res = {};

    
            for (let i = 0; i < this.players.length; i++) {
                this.currentPlayer = this.players[i];
    
                // Si le joueur n'a pas encore de dictionnaire de résultats, l'initialiser
                if (!this.res[this.currentPlayer]) {
                    this.res[this.currentPlayer] = {};
                }


                // Réinitialiser la fonctionnalité actuelle pour chaque joueur
                this.res[this.currentPlayer][this.actualFeature] = null;
                console.log('this.res AVANT reinitialisation pour chaque joueur');
                console.log(this.res);

                if (
                    this.res[this.currentPlayer][this.actualFeature] === undefined ||
                    this.res[this.currentPlayer][this.actualFeature] === null ||
                    this.res[this.currentPlayer][this.actualFeature] === ""
                ) {
                    await this.playerRound();
                    //console.log(this.res);
                    console.log('this.res après la selection de carte');
                    console.log(this.res);
                }
    
                this.initPlayersChoice();
            }
    
            // Si la fonctionnalité n'est pas encore dans le dictionnaire, l'initialiser à true
            if (!this.features.hasOwnProperty(this.actualFeature)) {
                this.features[this.actualFeature] = true;
            }
    
            // Vérifier si toutes les cartes sont les mêmes
            allPlayersSameCard = this.players.every(player =>
                this.res[player][this.actualFeature] === this.res[this.players[0]][this.actualFeature]
            );
    
            // Si toutes les cartes sont les mêmes, marquer la fonctionnalité comme true
            if (allPlayersSameCard) {
                if(this.res[this.players[0]][this.actualFeature] === 'cardCoffee'){
                    this.features[this.actualFeature] = false;
                    this.saveResToJson();
                }
                else {
                    this.features[this.actualFeature] = true;
                    this.checkFeaturesAndShowResult()
                }
            } else {
                this.features[this.actualFeature] = false;
                this.restartFeatureInfo.style.display = "flex";
            
                this.btRestartFeature.addEventListener('click', () => {
                    this.restartFeatureInfo.style.display = "none";
                    this.resetPlayersChoice();
                });
            }
        }
    }
        

    renameProject() {
        this.projectName.innerHTML = prompt('Comment voulez-vous nommer votre projet ?');
    }

    // Permet d'afficher la liste des features
    initFeaturesList() {
        if (Object.keys(this.features).length !== 0) {
            this.startBt.style.display = 'block';
            this.infoStart.style.display = 'none';
        }

        this.featuresList = document.querySelector("#featuresList");
        while (this.featuresList.firstChild) {
            this.featuresList.removeChild(this.featuresList.firstChild);
        }

        for (let feature in this.features) {
            if (this.features.hasOwnProperty(feature)) {
                this.featureItem = document.createElement('li');
                this.featureItem.textContent = feature;
                this.featuresList.appendChild(this.featureItem);
            }
        }

        this.newFeature = document.createElement('li');
        this.newFeature.textContent = "Ajouter une fonctionnalité";
        this.newFeature.classList.add('addFeature');
        this.featuresList.appendChild(this.newFeature);
        this.newFeature.addEventListener('click', () => this.addFeature());
    }

    addFeature() {
        let newFeature = "";
        while (newFeature === "" || newFeature === null) {
            newFeature = prompt("Quelle fonctionnalité souhaitez-vous ajouter ?");
            if (newFeature === "" || newFeature === null) {
                alert("Veuillez entrer un nom de fonctionnalité valide");
            }
        }
        this.features[newFeature] = false;
        this.initFeaturesList();
    }

    initPlayersChoice() {    
        let divThisPlayer = document.querySelector('#' + this.currentPlayer);
        let imgThisPlayer = divThisPlayer.querySelector('img');
        imgThisPlayer.src = this.imgSrc;
    }

    resetPlayersChoice() {
        this.divPlayer.forEach(div => {
            div.querySelector('img').src = "";
        });
    }

    allFeaturesChecked(features, checkedFeatures){
        let allChecked = true;
        for(let i=0; i < features.length; i++){
            allChecked = features[i] != checkedFeatures[i] ? false : allChecked
        }
        return allChecked;
    }

    showResult(){
        this.board.style.display = 'none';
        this.resultat.style.display = 'block';
        
        for(let feature in this.features){
                let div = document.createElement('div');
                let img = document.createElement('img');
                div.textContent = `${feature}:`;

                switch(this.res[this.players[0]][feature]){
                    case 'card0':
                        img.src = 'img/cartes_0.svg';
                        break;
                    case 'card1':
                        img.src = 'img/cartes_1.svg';
                        break;
                    case 'card2':
                        img.src = 'img/cartes_2.svg';
                        break;
                    case 'card3':
                        img.src = 'img/cartes_3.svg';
                        break;
                    case 'card5':
                        img.src = 'img/cartes_5.svg';
                        break;
                    case 'card8':
                        img.src = 'img/cartes_8.svg';
                        break;
                    case 'card13':
                        img.src = 'img/cartes_13.svg';
                        break;
                    case 'card20':
                        img.src = 'img/cartes_20.svg';
                        break;
                    case 'card40':
                        img.src = 'img/cartes_40.svg';
                        break;
                    case 'card100':
                        img.src = 'img/cartes_100.svg';
                        break;
                    case 'cardQuestion':
                        img.src = 'img/cartes_interro.svg';
                        break;
                    case 'cardCoffee':
                        img.src = 'img/cartes_cafe.svg';
                        break;
                }
                div.appendChild(img);
                this.resultat.appendChild(div);
        }
    }

    // Fonction pour enregistrer les résultats dans le stockage local
    saveResToJson(){
        const gameData = {
            name: this.projectName.textContent,
            res: this.res,
            features: this.features,
            players: this.players,
            difficulty: this.difficulty,
        };

        const gameDataJson = JSON.stringify(gameData);

        // Stocker la partie avec un nom donné dans le stockage local
        localStorage.setItem(this.projectName.textContent, gameDataJson);
    }
}

// Singleton implementation
const gameInstance = (function() {
    let instance = null;

    function createInstance(players, difficulty) {
        return new Game(players, difficulty);
    }

    return {
        getInstance: function(players, difficulty) {
            if (!instance) {
                instance = createInstance(players, difficulty);
            }
            return instance;
        }
    };
})();


module.exports = Game;
