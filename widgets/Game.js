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
        this.featureBt = document.querySelector('#featuresBt');
        this.closeFeature = document.querySelector('#closeFeatures');
        this.startBt = document.querySelector('#startBt');
        this.res = {};
        this.actualFeature = '';
        this.showActualFeature = document.querySelector('#actualFeature'); // Ajout de cette ligne
    }

    // Affichage et gestion des fonctions
    start() {
        this.gameContainer.style.display = 'block';
        this.searchContainer.style.display = 'none';
        this.startContainer.classList.add('play');
        document.querySelector('#difficulty').innerHTML = 'La partie est en mode <strong>' + this.difficulty + '</strong>';
        this.projectName.addEventListener('dblclick', () => this.renameProject());
        this.featureBt.addEventListener('click', () => this.showModalFeatures());
        this.closeFeature.addEventListener('click', () => this.hideModalFeatures());
        this.startBt.addEventListener('click', () => this.play());
        
    }

    renameProject() {
        this.projectName.innerHTML = prompt('Comment voulez-vous nommer votre projet ?');
    }

    // Permet d'afficher la liste des features
    initFeaturesList() {
        if (this.features.length !== 0) {
            this.startBt.style.display = 'block';
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

    // Afficher les paramètres des features
    showModalFeatures() {
        let modale = document.querySelector('#modalFeatures');
        this.initFeaturesList();
        modale.style.display = "block";
    }

    // Cacher les features
    hideModalFeatures() {
        let modale = document.querySelector('#modalFeatures');
        modale.style.display = "none";
    }

    // Fonction qui gère le jeu
    play() {
        this.res = {};
        for (let i = 0; i < this.players.length; i++) {
            this.res[this.players[i]] = {}; // Initialisation de l'objet pour chaque joueur
        }

        for (let j = 0; j < this.features.length; j++) {
            this.actualFeature = this.features[j];
            this.showActualFeature.innerHTML = 'Fonctionnalité actuelle : ' + this.actualFeature;

            for (let i = 0; i < this.players.length; i++) {
                while (this.res[this.players[i]][this.actualFeature] === null || this.res[this.players[i]][this.actualFeature] === undefined) {
                    console.log(`Au tour de ${this.players[i]}`);
                    let value = prompt(`Quelle carte souhaitez-vous jouer, ${this.players[i]} ?`);
                    this.res[this.players[i]][this.actualFeature] = value;
                }
                console.log(`${this.players[i]} a joué la carte ${this.res[this.players[i]][this.actualFeature]} pour la fonctionnalité ${this.actualFeature}`);
            }
        }
    }
}
