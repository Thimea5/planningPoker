<h1 class="title">Planning Poker</h1> 
<div id='startContainer'>
<script>
    let myRulesWidget = new RulesWidget();
    let myGameWidget = new GameWidget(myRulesWidget);
</script>
    <div id="searchGame" class="block">
        <h2>Reprendre une partie</h2>
    </div>

    <div id='game'>
        <div id='modalFeatures'>
            <button id='closeFeatures' class="closeBt">fermer</button><br>
            <span>Listes des Fonctionnalités</span>
            <ul id='featuresList'></ul>
        </div>

        <div id="gameParameters">
            <h2 id='projectName'>Projet (double clic pour modifier)</h2>
            <h3>Paramètres de la partie : </h3>
            <span id='difficulty'></span>
            <button id="featuresBt" class='simpleBt'>Voir les fonctionnalités</button>
        </div>

        <div id='boardGame'>
            <button id="startBt" class='simpleBt'>Commencer à jouer</button>
            <span id="actualFeature"></span>
        </div>
    </div>
</div>