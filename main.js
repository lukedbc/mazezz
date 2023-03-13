window.addEventListener('DOMContentLoaded', (event) => {

    function runGame() {
        playAudio(document.getElementById("audio"));
        startGame();
    }

    document.getElementById("start-screen").addEventListener("click", function() {
        document.getElementById("start-screen").style = "display:none";
        runGame();
    });

    document.getElementById("game-over-screen").addEventListener("click", function() {
        document.getElementById("game-over-screen").style = "display: none";
        runGame();
    });

});
