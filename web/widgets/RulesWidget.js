//Classe qui gère les règles
class RulesWidget {
    constructor() {
        this.init();
    }

    init() {
        this.createWidget();
        this.showRulesDifficulty();
    }

    createWidget() {
        this.containerRulesWidget = document.createElement("div");
        this.containerRules = document.createElement("div");
        this.difficultyRules = document.createElement('div');

        this.containerRules.innerHTML = "<h2>En quoi consiste le Planning Poker ?</h2><p>Le planning Poker est très utile pour planifier et estimer les difficultés de chaque taches a effectuer dans un projet.</p>";

        this.difficultyChoice =  document.createElement("select");
        this.difficultyChoice.add(new Option("Basique","basic")); //Deuxième paramètre = value
        this.difficultyChoice.add(new Option("Intermediaire","medium"));
        this.difficultyChoice.add(new Option("Difficile","hard"));
        
        this.difficultyChoice.addEventListener("change", () => this.showRulesDifficulty(this.difficultyChoice.options[this.difficultyChoice.selectedIndex].value));

        //Personnalisation du suelect (le refaire en css c mieux)
        this.difficultyChoice.style.height = "30px";
        this.difficultyChoice.style.color = "white";
        this.difficultyChoice.style.backgroundColor = "black";
        this.difficultyChoice.style.border = "2px solid black";
        this.difficultyChoice.style.borderRadius = "5px";
        this.difficultyChoice.style.margin = "10px";
        this.difficultyChoice.style.padding = "5px";
        this.difficultyChoice.style.fontFamily = "Arial, sans-serif";

        this.containerRulesWidget.classList.add("containerRulesWidget");


        this.containerRulesWidget.appendChild(this.containerRules);
        this.containerRulesWidget.appendChild(this.difficultyChoice)
        this.containerRulesWidget.appendChild(this.difficultyRules)
        document.body.appendChild(this.containerRulesWidget);
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

