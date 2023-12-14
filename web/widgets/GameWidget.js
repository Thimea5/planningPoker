//Classe qui gère le lancement de la partie
class GameWidget {
    constructor() {
        this.init();
    }

    init() {
        this.createWidget();
    }

    createWidget() {
        //Nombre de joueur
        this.startContainer = document.querySelector('#startContainer');
        this.containerGameWidget = document.createElement("div");
        this.containerPlayers =  document.createElement("div");
        this.containerPlayers.innerHTML = "<span>Choisir le nombre de joueur : </span><select class='selectNbPlayers'><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option></select>";

        this.difficultyChoice =  document.createElement("div");
        this.difficultyChoice.innerHTML = "<span>Choisir une difficulté : </span><select class='selectDifficulty'><option value='basic'>Basique</option><option value='medium'>Medium</option><option value='hard'>Difficile</option></select>";
        
        this.difficultyChoice.addEventListener("change", () => this.showRulesDifficulty(this.difficultyChoice.options[this.difficultyChoice.selectedIndex].value));

        this.btPlay = document.createElement("button");
        this.btPlay.classList.add("btPlay");
        this.btPlay.innerHTML = "Jouer";
        this.containerGameWidget.innerHTML = "<h2>Lancer une partie</h2>";
        this.containerGameWidget.classList.add("containerGameWidget");

        this.containerGameWidget.appendChild(this.containerPlayers);
        this.containerGameWidget.appendChild(this.difficultyChoice);
        this.startContainer.appendChild(this.containerGameWidget);

        this.selectNbPlayers = document.querySelector('.selectNbPlayers');
        this.setNbPlayers(this.selectNbPlayers.value)
        this.selectNbPlayers.addEventListener('change', () => this.setNbPlayers(this.selectNbPlayers.value));
        
        this.containerGameWidget.appendChild(this.btPlay)
        this.btPlay.addEventListener('click', this.play.bind(this));

    }


    setNbPlayers(nbPlayers){
        //On supprime les anciens input
        this.removePlayerInputs();

        for (let i = 0; i < nbPlayers; i++){
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Nom du joueur ${i + 1}`;
            this.containerGameWidget.appendChild(input);
        }
    }

    //fonction qui permet de supprimer les anciens input
    removePlayerInputs() {
        const inputs = this.containerGameWidget.querySelectorAll('input');
        inputs.forEach((input) => {
            this.containerGameWidget.removeChild(input);
        });
    }

    play(){ //lancer la partie
        const inputs = this.containerGameWidget.querySelectorAll('input');
        const playerNames = Array.from(inputs).map((input) => input.value);
        console.log(playerNames);
    }
}