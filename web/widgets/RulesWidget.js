//Classe qui gère les règles
class RulesWidget {
    constructor(mattersArray) {
        this.matters = mattersArray;
        this.containerMatterWidget = null;
        this.headerMatter = null;
        this.containerMatters = null;

        this.init();
    }

    init() {
        this.createWidget();
        this.addEventListeners();
    }

    createWidget() {
        this.containerMatterWidget = document.createElement("div");
        this.headerMatter = document.createElement("div");
        this.containerMatters = document.createElement("div");
        this.addMatterButton = document.createElement("div");

        this.containerMatterWidget.classList.add("containerMatterWidget");
        this.headerMatter.classList.add("headerMatter");
        this.containerMatters.classList.add("containerMatters");
        this.addMatterButton.classList.add("addMatter");

        this.addMatterButton.setAttribute('title','Ajouter une nouvelle matière');
        this.addMatterButton.innerHTML = 'ajouter une matière';

        this.headerMatter.innerHTML = "<h2 class='headerMatterTitle'>Mes cours</h2>";

        document.body.appendChild(this.containerMatterWidget);
        this.containerMatterWidget.appendChild(this.headerMatter);

        this.populateMatters();
        this.containerMatterWidget.appendChild(this.containerMatters);
        this.containerMatterWidget.appendChild(this.addMatterButton);
    }

    //Compte le nombre de matière dans la bdd
    populateMatters() {
        for (let i = 0; i < this.matters.length; i++) {
            let name = this.matters[i];

            let aMatter = document.createElement("div");
            aMatter.classList.add("aMatter");
            this.containerMatters.appendChild(aMatter);

            aMatter.innerHTML = "<h3>" + name + "</h3><a href='' class='matterLink'>accéder à ce cours</a>";
        }
    }

    //Liste des events
    addEventListeners(){
        let addMatter = document.querySelector(".addMatter").addEventListener('click', () => {
            console.log("addMatter cliqué");
            this.form();
            /*
            $.ajax({
                url: '../functions.php', 
                method: 'POST', // Ou get ?
                data: {
                    action: 'addMatter', // Un paramètre pour indiquer l'action à effectuer dans le fichier PHP
                    name: name
                },
                success: function (reponse) {
                    // Traitement de la réponse de la fonction PHP
                    console.log(reponse);
                },
                error: function (erreur) {
                    // En cas d'erreur lors de l'appel de la fonction PHP
                    console.error(erreur);
                }
            });
            */
        });
    }

    form(){
       //formulaire pour renseigner les informations de la nvlle matière
    }
}

