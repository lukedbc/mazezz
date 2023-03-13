function GameState(context) {
    this.startTime = this.lastTime = Date.now();
    this.timePassed = 0;
    this.gameFrames = 0;
    this.isOver = {
        status: false,
        reasonCode: ""
    };

    this.currentLevel = null;
    this.currentPlayer = null;

    this.context = context;
}

GameState.prototype.start = function() {
    this.reset();
}

GameState.prototype.isOnEndPos = function({ x, y }) {
    return x === this.currentLevel.end.x
        && y === this.currentLevel.end.y;
}

GameState.prototype.isPlayerReachEndPos = function() {
    let refBox = { x: this.currentPlayer.x, y: this.currentPlayer.y };
    let ceilRefBox = { x: Math.ceil(refBox.x), y: Math.ceil(refBox.y) };

    return this.isOnEndPos(refBox)
        || (this.isOnEndPos(ceilRefBox) && (ceilRefBox.x - refBox.x <= 0.02));
}

GameState.prototype.gameOverChecker = function(secondPassed) {
    this.timePassed = secondPassed;
    if (this.timePassed >= this.currentLevel.timeLimit) {
        this.isOver = {
            status: true,
            reasonCode: "time.out"
        };
        return this.isOver;
    }

    if (this.isPlayerReachEndPos()) {
        this.isOver = {
            status: true,
            reasonCode: "clear.level"
        }
        return this.isOver;
    }

    return this.isOver;
}

GameState.prototype.isGameOver = function() {
    return this.isOver.status;
}

GameState.prototype.reset = function() {
    this.startTime = this.lastTime = Date.now();
    this.timePassed = 0;
    this.gameFrames = 0;
    this.isOver = {
        status: false,
        reasonCode: ""
    };

    this.currentLevel = getLatestLevelByUser("");
    this.currentPlayer = new PlayerEntity({
        startPos: this.currentLevel.start
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
