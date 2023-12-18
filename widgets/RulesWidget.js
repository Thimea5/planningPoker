//Classe qui gère les règles
class RulesWidget {
    constructor() {
        this.startContainer = document.querySelector('#startContainer');
        this.containerRulesWidget = document.createElement("div");
        this.containerRules = document.createElement("div");
        this.difficultyRules = document.createElement('div');

        this.containerRules.innerHTML = "<h2>En quoi consiste le Planning Poker ?</h2><p>Le planning Poker est très utile pour planifier et estimer les difficultés de chaque taches a effectuer dans un projet.</p>";

        this.difficultyChoice =  document.createElement("select");
        this.difficultyChoice.classList.add("selectDifficulty");
        this.difficultyChoice.add(new Option("Basique","basic")); //Deuxième paramètre = value
        this.difficultyChoice.add(new Option("Intermediaire","medium"));
        this.difficultyChoice.add(new Option("Difficile","hard"));
        
        this.difficultyChoice.addEventListener("change", () => this.showRulesDifficulty(this.difficultyChoice.options[this.difficultyChoice.selectedIndex].value));

        this.containerRulesWidget.classList.add("containerRulesWidget");


        this.containerRulesWidget.appendChild(this.containerRules);
        this.containerRulesWidget.appendChild(this.difficultyChoice)
        this.containerRulesWidget.appendChild(this.difficultyRules)
        this.startContainer.appendChild(this.containerRulesWidget);
        
        this.showRulesDifficulty();
    }


    showRulesDifficulty(difficulty="basic"){ //Si difficulty=null, il prend la valeur par defaut basic
        console.log(difficulty);

        switch(difficulty){
            case 'basic':
                this.difficultyRules.innerHTML = '<h3>Mode basique</h3><p>Le mode de jeu basique est le plus simple. Pas de limite de temps ..</p>';
            break;
            case 'medium':
                this.difficultyRules.innerHTML = '<h3>Mode Intermédiaire</h3><p>Le mode de jeu intermédiaire est le plus équilivré. Le temps est limité a  ..</p>';
            break;
            case 'hard':
                this.difficultyRules.innerHTML = '<h3>Mode difficile</h3><p>Le mode de jeu difficile est le plus compliqué. Le temps est limité a  ..</p>';
            break;
        }
    }
}
