function Renderer() {

}
Renderer.prototype.clear = function() {
    context.clearRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.heigth);
}

Renderer.prototype.renderBackground = function(context, backgroundAsset, { x, y }) {
    context.drawImage(backgroundAsset, x, y);
}

Renderer.prototype.renderMaze = function(context, { treeImage, roadImage }, maze) {

    function __internal__renderNature(image, { i, j }) {
        if (CONFIG.game.debug) {
            context.strokeRect(CONFIG.asset.width * j + CONFIG.asset.marginLeft,
                CONFIG.asset.height * i + CONFIG.asset.marginTop,
                CONFIG.asset.width, CONFIG.asset.height);
        }
        context.drawImage(image,
            CONFIG.asset.width * j + CONFIG.asset.marginLeft,
            CONFIG.asset.height * i + CONFIG.asset.marginTop,
            CONFIG.asset.width, CONFIG.asset.height);
    }

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[0].length; j++) {
            switch (maze[i][j]) {
                case 1:
                    __internal__renderNature(treeImage, { i, j });
                    break;
                case 0:
                    __internal__renderNature(roadImage, { i, j });
                    break;
            }
        }
    }
}

Renderer.prototype.renderCharacter = function(context, gameFrames, character, playerAsset, animations) {
    function __internal__fixedStaggerFrames(animationsFrames) {
        return animationsFrames > 3 ? CONFIG.game.staggerFrames : CONFIG.game.staggerFrames + 3;
    }

    function __internal__getSpriteSize(animationObject, pos) {
        if (animationObject.width && animationObject.height) {
            return { spriteWidth: animationObject.width, spriteHeight: animationObject.height };
        }

        if (animationObject.loc[pos]) {
            if (animationObject.loc[pos].w && animationObject.loc[pos].h) {
                return { spriteWidth: animationObject.loc[pos].w, spriteHeight: animationObject.loc[pos].h };
            }
        }

        return null;
    }

    let state = character.currentState;

    let characterState = character.currentState.name;
    if (!animations[characterState]) {
        return;
    }
    let frames = animations[characterState].frames;
    let position = Math.floor(gameFrames / __internal__fixedStaggerFrames(frames)) % frames;

    let { spriteWidth, spriteHeight } = __internal__getSpriteSize(animations[characterState], position);

    let frameX = animations[characterState].loc[position].x;
    let frameY = animations[characterState].loc[position].y;

    let x = CONFIG.asset.marginLeft + character.x * CONFIG.asset.width;
    let y = CONFIG.asset.marginTop + character.y * CONFIG.asset.height;

    if (CONFIG.game.debug) {
        context.strokeRect(x, y, character.width, character.height);
    }
    context.drawImage(playerAsset, frameX, frameY,
        spriteWidth, spriteHeight,
        x, y,
        character.width, character.height);
}

Renderer.prototype.renderTimeLimit = function(context, value) {
    function __internal__normalizeTimePassed(value) {
        let minutes = Math.trunc(value / 60);
        let seconds = value % 60;
        return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
    }

    context.font = "48px serif"
    context.fillStyle = "#ff0000"
    context.fillText(__internal__normalizeTimePassed(value),
        CONFIG.asset.width + (CONFIG.maze.row * CONFIG.asset.width) / 2, CONFIG.asset.marginTop - 15);
}

Renderer.prototype.renderMap = function(context, assets, levelMaze) {

    function __internal__renderBackground(renderer) {
        const background = assets["background"];
        if (!background) {
            return;
        }
        if (background.isLoaded()) {
            renderer.renderBackground(context, background.getElement(), { x: 0, y: 0 });
        }
    }

    function __internal__renderMaze(renderer, level) {
        const tree = assets["tree"];
        const road = assets["road"];

        if (!tree || !road) {
            return;
        }
        if (tree.isLoaded() && road.isLoaded()) {
            const treeImage = assets["tree"].getElement();
            const roadImage = assets["road"].getElement();
            renderer.renderMaze(context, { treeImage, roadImage }, level.maze);
        }
    }

    __internal__renderBackground(this);
    __internal__renderMaze(this, levelMaze);
}
