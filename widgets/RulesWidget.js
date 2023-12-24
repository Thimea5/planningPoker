//Classe qui gère les règles
class RulesWidget {
    constructor() {
        this.startContainer = document.querySelector('#startContainer');
        this.containerRulesWidget = document.createElement("div");
        this.containerRules = document.createElement("div");
        this.difficultyRules = document.createElement('div');
        this.containerRulesWidget.classList.add("block");

        this.containerRules.innerHTML = "<h2>En quoi consiste le Planning Poker ?</h2><p>Le planning Poker est très utile pour planifier et estimer les difficultés de chaque taches a effectuer dans un projet.</p>";

        this.difficultyChoice =  document.createElement("select");
        this.difficultyChoice.classList.add("selectDifficulty");
        this.difficultyChoice.add(new Option("Mode strict","strict")); //Deuxième paramètre = value
        this.difficultyChoice.add(new Option("Mode moyenne","moyenne"));
        
        this.difficultyChoice.addEventListener("change", () => this.showRulesDifficulty(this.difficultyChoice.options[this.difficultyChoice.selectedIndex].value));

        this.containerRulesWidget.classList.add("containerRulesWidget");


        this.containerRulesWidget.appendChild(this.containerRules);
        this.containerRulesWidget.appendChild(this.difficultyChoice)
        this.containerRulesWidget.appendChild(this.difficultyRules)
        this.startContainer.appendChild(this.containerRulesWidget);
        
        this.showRulesDifficulty();
    }

     //Supprime l'objet
     delete(){
        while (this.containerRulesWidget.firstChild){
            this.containerRulesWidget.removeChild(this.containerRulesWidget.firstChild);
        }

        delete this.gameWidget;
        const containerRulesWidget = document.querySelector('.containerRulesWidget');
        if (containerRulesWidget) {
            containerRulesWidget.remove();
        }
    }

    showRulesDifficulty(difficulty="strict"){ //Si difficulty=null, il prend la valeur par defaut basic
        switch(difficulty){
            case 'strict':
                this.difficultyRules.innerHTML = '<h3>Mode strict</h3><p>Pour le mode de jeu strict, les joueurs votent jusqu\'à ce que l\'unanimité soit acquise</p>';
            break;
            case 'moyenne':
                this.difficultyRules.innerHTML = '<h3>Mode moyenne</h3><p>Pour le mode moyenne, le premier tour de chaque tâche se joue quand même sur l\'unanimité. ce n\'est qu\'à partir des tours suivants que l\'on utilise la moyenne. Ce choix permet d\'avoir au moins un temps de discussion si les joueurs ne sont pas d\'accord en premier lieu</p>';
            break;
        }
    }
}
