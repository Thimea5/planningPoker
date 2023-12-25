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
        this.features = {};
        this.startBt = document.querySelector('#startBt');
        this.infoStart = document.querySelector('#infoStart');
        this.showPlayers = document.querySelector('#playersList'); 
        this.divPlayers = document.querySelector('#players');
        this.res = {};
        this.board = document.querySelector('#boardGame');
        this.actualPlayer = document.querySelector('#actualPlayer');
        this.cards = document.querySelector('#cards');
        this.divActualFeature = document.querySelector('#actualFeature');
        this.actualFeature = "";
        this.imgSrc = "";
        this.currentPlayer = "";
        this.divPlayer = [];
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

    async playForFeature() {
        let allPlayersSameCard = false;
    
        while (!allPlayersSameCard) {
            // Réinitialiser les résultats du tour précédent
            this.res = {};
    
            for (let i = 0; i < this.players.length; i++) {
                this.currentPlayer = this.players[i];
    
                if (!this.res[this.currentPlayer]) {
                    this.res[this.currentPlayer] = {};
                }
    
                if (
                    this.res[this.currentPlayer][this.actualFeature] === undefined ||
                    this.res[this.currentPlayer][this.actualFeature] === null ||
                    this.res[this.currentPlayer][this.actualFeature] === ""
                ) {
                    await this.playerRound();
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
                this.features[this.actualFeature] = true;
                console.log(` ${this.actualFeature} true`);
            } else {
                this.features[this.actualFeature] = false;
                console.log(`${this.actualFeature} false`);
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
        console.log("voici divPlayers : ");
        console.log(this.divPlayer);
        this.divPlayer.forEach(div => {
            console.log('je suis dans la boucle de diplayer');
            div.querySelector('img').src = "";
            console.log(+div);
        });
    }

    allFeaturesChecked(features, checkedFeatures){
        let allChecked = true;
        for(let i=0; i < features.length; i++){
            allChecked = features[i] != checkedFeatures[i] ? false : allChecked
        }
        return allChecked;
    }

    showResult(res){
        console.log(`partie terminée !  voici les resultat : `);
        for(let i = 0; i < res.length; i++){
            console.log(res[i]);
        }
    }
}
