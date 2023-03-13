function GameState(context) {
    this.startTime = this.lastTime = Date.now();
    this.timePassed = 0;
    this.gameFrames = 0;
    this.isOver = false;

    this.currentLevel = null;
    this.currentPlayer = null;
    this.currentEnemy = null;

    this.context = context;
}

GameState.prototype.start = function() {
    this.reset();
}

GameState.prototype.gameOverChecker = function(secondPassed) {
    this.timePassed = secondPassed;
    if (this.timePassed >= this.currentLevel.timeLimit) {
        this.isOver = true;
    }
    return this.isOver;
}

GameState.prototype.isGameOver = function() {
    return this.isOver;
}

GameState.prototype.reset = function() {
    this.startTime = this.lastTime = Date.now();
    this.timePassed = 0;
    this.gameFrames = 0;
    this.isOver = false;

    this.currentLevel = getLatestLevelByUser("");
    this.currentPlayer = new PlayerEntity({
        startPos: this.currentLevel.start
    });
    this.currentEnemy = new EnemyEntity({
        startPos: this.currentLevel.enemySpawn
    });
}

GameState.prototype.gameOver = function() {
    context.clearRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);
    document.getElementById("game-over-screen").style = "display: block"
    stopAudio(document.getElementById("audio"));
}

GameState.prototype.getLevel = function() {
    return this.currentLevel;
}

GameState.prototype.getPlayer = function() {
    return this.currentPlayer;
}
