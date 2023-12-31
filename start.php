<h1 class="title">Planning Poker</h1> 
<div id='startContainer'>
    <div id='game'>
        <div id="gameParameters">
            <h2 id='projectName'>Projet (double clic pour modifier)</h2>
            <h3>Paramètres de la partie : </h3>
            <span id='difficulty'></span><br><br><br>
            <h3>Listes des joueurs</h3>
            <ul id='playersList'></ul>
            <br><div id='modalFeatures'>
                <h3>Listes des Fonctionnalités</h3>
                <ul id='featuresList'>Listes des Fonctionnalités</ul>
            </div>
        </div>

        <div id='boardGame'>
            <button id="startBt" class='simpleBt'>Commencer à jouer</button>
            <span id='infoStart'>Pour commencer, ajoutez au moins une Fonctionnalité</span>
            <div id="actualFeature"></div>
            <div id="players"></div>
            <div id='actualPlayer'></div>
            <div id="restartFeature">
                <p>Les joueurs doivent trouver une entente ! Discutez entre vous.</p>
                <button id="btRestartFeature" class=''>Recommencer</button>
            </div>
            <div id="cards">
                <img id="card0" class="card" src="./img/cartes_0.svg" alt="0">
                <img id="card1" class="card" src="./img/cartes_1.svg" alt="1">
                <img id="card2" class="card" src="./img/cartes_2.svg" alt="2">
                <img id="card3" class="card" src="./img/cartes_3.svg" alt="3">
                <img id="card5" class="card" src="./img/cartes_5.svg" alt="5">
                <img id="card8" class="card" src="./img/cartes_8.svg" alt="8">
                <img id="card13" class="card" src="./img/cartes_13.svg" alt="13">
                <img id="card20" class="card" src="./img/cartes_20.svg" alt="20">
                <img id="card40" class="card" src="./img/cartes_40.svg" alt="40">
                <img id="card100" class="card" src="./img/cartes_100.svg" alt="100">
                <img id="cardQuestion" class="card" src="./img/cartes_interro.svg" alt="?">
                <img id="cardCoffee" class="card" src="./img/cartes_cafe.svg" alt="Café">
            </div>
        </div>
    </div>

    <div id="searchGame" class="block">
        <h2>Reprendre une partie</h2>
        <select id="gameList"></select>
        <button id="playOldGame">Reprendre la partie</button>
        <button id="resetGameList">Supprimer toutes les parties</button>
    </div>

    <div id="resultat">
        <p>Toutes les Fonctionnalités ont été traitées, voici le résultat de la partie !  <div id="showResult"></div></p>
    </div>
</div>

<script>
        let myRulesWidget = new RulesWidget();
        let myGameWidget = new GameWidget(myRulesWidget);
        let mySearchWidget = new SearchWidget();
        mySearchWidget.searchGame();
    </script>


