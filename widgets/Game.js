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
        this.divPlayers = document.querySelector('#players');
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

        this.startBt.addEventListener('click', () => this.play(this.players, this.features, this.divPlayers));
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
        this.newFeature.classList.add('addFeature');
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

    initPlayersChoice(player, src) {    
        let divPlayer = document.querySelector('#' + player);
        let imgPlayer = divPlayer.querySelector('img');
        imgPlayer.src = src;
    }

    resetPlayersChoice() {
        let divPlayers = document.querySelectorAll('#players div');
        divPlayers.forEach(div => {
            let img = div.querySelector('img');
            img.src = "";
        });
    }

    // Fonction asynchrone qui gère le jeu
    async play(players, features, divPlayers) {
        // variables pour cette fonction
        this.board = document.querySelector('#boardGame');
        this.actualPlayer = document.querySelector('#actualPlayer');
        this.cards = document.querySelector('#cards');
        this.actualFeature = document.querySelector('#actualFeature');
        let cardsArray = Array.from(this.cards.children);
        let res = {};
        let imgSrc = "";
    
        this.board.style.display = 'block';
        this.cards.style.display = 'flex';
        this.startBt.style.display = 'none';
        divPlayers.style.display = 'flex';
    
        // Initialisation de l'objet res pour chaque joueur
        players.forEach(player => {
            res[player] = {};
        });
    
        for (let j = 0; j < features.length; j++) {
            this.actualFeature.innerHTML = 'Fonctionnalité actuelle : ' + features[j];
            console.log('Fonctionnalité actuelle : ' + features[j]);
            this.resetPlayersChoice();
    
            for (let i = 0; i < players.length; i++) {
                if (
                    res[players[i]][features[j]] === undefined ||
                    res[players[i]][features[j]] === null ||
                    res[players[i]][features[j]] === ""
                ) {
                    let currentPlayer = players[i];
                    this.actualPlayer.innerHTML = `A ton tour <strong>${currentPlayer}</strong> ! `;
                    console.log(`Au tour de ${currentPlayer} donc ${players[i]}`);
    
                    // Créer une Promise pour attendre le clic sur une carte
                    const waitForCardClick = () => {
                        return new Promise(resolve => {
                            // Fonction de gestionnaire d'événements pour une carte spécifique
                            let clickHandler = (event) => {
                                res[players[i]][features[j]] = event.currentTarget.id;
                                imgSrc = event.currentTarget.src;
                                console.log(`${players[i]} a joué la carte ${event.currentTarget.id} pour la fonctionnalité ${features[j]}`);
                                resolve(); // Résoudre la Promise une fois que le clic a eu lieu
                            };
    
                            // Ajouter un seul écouteur d'événements à chaque carte
                            cardsArray.forEach(card => {
                                card.addEventListener('click', clickHandler);
                            });
                        });
                    };
    
                    // Attendre que le joueur clique sur une carte
                    await waitForCardClick();
                }
                this.initPlayersChoice(players[i], imgSrc);
            }
        }
    }
    

    
}
