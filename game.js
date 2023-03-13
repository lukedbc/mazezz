const resources = new Resources();
const renderer = new Renderer();
const inputHandler = new InputHandler();

const context = resources.context;
const assets = resources.assets;

const gameState = new GameState(context);

function normalizeTimePassed(value) {
    let minutes = Math.trunc(value / 60);
    let seconds = value % 60;
    return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
}

function update(deltaTime, secondPassed) {
    gameState.currentPlayer.update(inputHandler.actions, deltaTime);
    if (gameState.gameOverChecker(secondPassed)) {
        return;
    }
}

function check() {
    // run to the corner
}

function render() {
    renderer.clear();
    renderer.renderMap(context, assets, gameState.currentLevel);
    renderer.renderTimeLimit(context, gameState.timePassed);
    renderer.renderCharacter(context, gameState.gameFrames, gameState.currentPlayer, assets["player"].getElement(), PLAYER_ANIMATIONS);
    renderer.renderCharacter(context, gameState.gameFrames, gameState.currentEnemy, assets["enemy"].getElement(), ENEMY_ANIMATIONS);
}

function gameLoop() {
    if (gameState.isGameOver()) {
        gameState.gameOver();
        gameState.reset();
        return;
    }
    let now = Date.now();
    let lastTime = gameState.lastTime;
    if (!lastTime) {
        lastTime = now;
    }
    let delta = now - lastTime;

    let secondPassed = calculateSecondPassed(now, gameState.startTime);
    update(delta / 1000, secondPassed);
    render();
    gameState.lastTime = now;
    gameState.gameFrames++;

    requestAnimationFrame(gameLoop);
}

function calculateSecondPassed(startInLoop, startGameTime) {
    return Math.floor((startInLoop - startGameTime) / 1000);
}

function startGame() {
    gameState.start();
    gameLoop();
}

