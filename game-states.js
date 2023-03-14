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
    this.currentEnemies = null;

    this.context = context;
}

GameState.prototype.generateEnemies = function(assets) {

    function __internal__generatingEnemyPos(gameState) {
        let startPos = {
            x: randomNumber(0, gameState.currentLevel.maze.length - 1),
            y: randomNumber(0, gameState.currentLevel.maze[0].length - 1)
        };
        let player = gameState.currentPlayer;
        if (Math.abs(player.x - startPos.x) > 2
            && Math.abs(player.y - startPos.y) > 2
            && gameState.currentLevel.maze[startPos.y][startPos.x] === 0) {
            return startPos;
        }
        return __internal__generatingEnemyPos(gameState);
    }
    this.currentEnemies = [];
    for (let enemyTypeIndex = 0; enemyTypeIndex < this.currentLevel.enemy.length; enemyTypeIndex++) {
        let enemyType = this.currentLevel.enemy[enemyTypeIndex];
        for (let i = 0; i < enemyType.number; i++) {
            let startPos = __internal__generatingEnemyPos(this);
            let type = enemyType.type;
            let enemy = new EnemyEntity({ startPos, enemyType: type });
            enemy.changeState({
                type: ENEMY_TYPE_INFO[type].defaultState,
                name: ENEMY_TYPE_INFO[type].defaultState
            });

            let awardsInfo = ENEMY_TYPE_INFO[type].awards;
            let awards = buildAward(awardsInfo);

            enemy.setAwards(awards);

            this.currentEnemies.push(enemy);
        }
    }
}

GameState.prototype.removeKilledEnemies = function() {
    this.currentEnemies = this.currentEnemies.filter(enemy => enemy.currentState.type !== "killed");
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
        || (this.isOnEndPos(ceilRefBox) && (ceilRefBox.x - refBox.x <= 0.2));
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
    gameState.currentPlayer.stopAudio();
    stopAudio(document.getElementById("audio"));
}

GameState.prototype.getLevel = function() {
    return this.currentLevel;
}

GameState.prototype.getPlayer = function() {
    return this.currentPlayer;
}
