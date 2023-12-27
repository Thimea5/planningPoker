
//Classe qui gère le lancement de la partie
class GameWidget {
    constructor(rulesWidget) {
        //Nombre de joueur
        this.rulesWidget = rulesWidget;
        this.startContainer = document.querySelector('#startContainer');
        this.containerGameWidget = document.createElement("div");

        this.containerPlayers = Object.assign(document.createElement("div"), {
            innerHTML: "<span>Choisir le nombre de joueur : </span><select class='selectNbPlayers'><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option></select>"
        });

        this.containerGameWidget.classList.add("block");
        this.difficultyChoice =  document.createElement("div");
        this.difficultyChoice.innerHTML = "<span>Choisir une difficulté : </span><select class='selectDifficulty'><option value='strict'>Strict</option><option value='medium'>Medium</option></select>";
        let selectedDifficulty = document.querySelector(".selectDifficulty").selectedIndex = null ? "strict" : document.querySelector(".selectDifficulty").value;
        this.difficultyChoice.addEventListener("change", (event) => {
            selectedDifficulty = event.target.value;
        });        

        this.btPlay = Object.assign(document.createElement("button"), {
            className: "btPlay",
            innerHTML: "Jouer"
        });
    
        this.containerGameWidget.innerHTML = "<h2>Lancer une partie</h2>";
        this.containerGameWidget.classList.add("containerGameWidget");

        this.containerGameWidget.appendChild(this.containerPlayers);
        this.containerGameWidget.appendChild(this.difficultyChoice);
        this.startContainer.appendChild(this.containerGameWidget);

        this.selectNbPlayers = document.querySelector('.selectNbPlayers');
        this.setInputPlayers(this.selectNbPlayers.value)
        this.selectNbPlayers.addEventListener('change', () => this.setInputPlayers(this.selectNbPlayers.value));
        this.btPlay.addEventListener('click', () => {
            this.play(selectedDifficulty);
        });
        this.containerGameWidget.appendChild(this.btPlay);
    }
    
    //Supprime l'objet
    delete(){
        while (this.containerGameWidget.firstChild){
            this.containerGameWidget.removeChild(this.containerGameWidget.firstChild);
        }

        delete this.gameWidget;
        const gameWidgetElement = document.querySelector('.containerGameWidget');
        if (gameWidgetElement) {
            gameWidgetElement.remove();
        }
    }

    setInputPlayers(nbPlayers){
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

    play(selectedDifficulty){ //lancer la partie
        let allPlayersNamed = true;
        const inputs = this.containerGameWidget.querySelectorAll('input');
        const playerNames = Array.from(inputs).map((input) => input.value);
        for(let i=0; i<playerNames.length; i++){
            if(playerNames[i] == "" || playerNames[i] == null){
                allPlayersNamed = false;
            }
        }
        if (allPlayersNamed){
            //const game = new Game(playerNames, selectedDifficulty);
            const game = gameInstance.getInstance(playerNames, selectedDifficulty);
            this.delete();
            this.rulesWidget.delete();
            game.start();
        }
    }
}