<h1 class="title">Planning Poker</h1> 
<div id='startContainer'>
<script>
    let myRulesWidget = new RulesWidget();
    let myGameWidget = new GameWidget(myRulesWidget);
</script>
    <div id='game'>
        <div id='modalFeatures'>
            <button id='closeFeatures' class="closeBt">fermer</button><br>
            <span>Listes des Fonctionnalités</span>
            <ul id='featuresList'></ul>
        </div>

        <h2 id='projectName'>Projet (double clic pour modifier)</h2>
        <span id='difficulty'></span>
        <button id="featuresBt" class='simpleBt'>Voir les fonctionnalités</button>
        
        <button id="startBt" class='simpleBt'>Commencer à jouer</button>

        <span id="actualFeature"></span>

        <div id='players'>
            <div id='displayCards'></div>
        </div>
    </div>
</div>