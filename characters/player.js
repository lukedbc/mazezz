function PlayerEntity({
    startPos,
}) {
    this.x = startPos.x;
    this.y = startPos.y;
    this.width = CONFIG.asset.width;
    this.height = CONFIG.asset.height;
    this.speed = 1;
    this.faceTo = "right";
    this.direction = "right";
    this.currentState = {
        type: "idle",
        name: "idle" + this.faceTo.capitalize()
    }
}

PlayerEntity.prototype.applySpeed = function(speed) {
    let newX = this.x;
    let newY = this.y;

    if (this.direction === "right") {
        newX += speed;
    }
    if (this.direction === "left") {
        newX -= speed;
    }
    if (this.direction === "up") {
        newY -= speed;
    }
    if (this.direction === "down") {
        newY += speed;
    }

    return { newX, newY };
}

PlayerEntity.prototype.changePosition = function({
    direction,
    type,
    speed
}) {
    this.direction = direction;
    this.faceTo =
        direction == "left" || direction == "right"
            ? direction
            : this.faceTo;
    this.currentState = {
        type: type,
        name: type + this.faceTo.capitalize()
    };

    function __internal__changePositionWithSpeed(player, speed) {
        let { newX, newY } = player.applySpeed(speed);
        let mazeSize = {
            row: gameState.currentLevel.maze.length,
            column: gameState.currentLevel.maze[0].length
        }

        if (newX < 0 || newX > mazeSize.row - 1) {
            return;
        }

        if (newY < 0 || newY > mazeSize.column - 1) {
            return;
        }

        if (gameState.currentLevel.maze[newY][newX] === 1) {
            return;
        }

        player.x = newX;
        player.y = newY;
    }

    if (type !== "move") {
        return;
    }
    if (speed) {
        __internal__changePositionWithSpeed(this, speed);
    } else {
        __internal__changePositionWithSpeed(this, this.speed);
    }
}

PlayerEntity.prototype.idle = function() {
    let oldCurrentState = this.currentState;
    this.currentState = {
        type: "idle",
        name: "idle" + this.faceTo.capitalize()
    }
}

PlayerEntity.prototype.move = function(direction) {
    this.changePosition({
        direction: direction,
        type: "move",
    });
}

PlayerEntity.prototype.niceMove = function(direction, deltaTime) {
    this.changePosition({
        direction: direction,
        type: "move",
        speed: this.speed * deltaTime
    });
}

PlayerEntity.prototype.attack = function(direction) {
    this.changePosition({
        direction: direction,
        type: "attack",
    });
}

PlayerEntity.prototype.turn = function(faceTo) {
    this.faceTo = faceTo;
    let oldCurrentState = this.currentState;
    this.currentState = {
        type: oldCurrentState.type,
        name: oldCurrentState.type + this.faceTo.capitalize()
    }
}

PlayerEntity.prototype.update = function(actions, deltaTime) {
    if (!actions || actions.length <= 0) {
        return;
    }
    actions.forEach(action => {
        if (!action) {
            return;
        }

        let splited = action.split(".");
        let type = splited[0];
        let direction = splited[1];

        if (type === "move") {
            // this.niceMove(direction, deltaTime);
            this.move(direction);
            return;
        }
        if (type === "attack") {
            this.attack(this.faceTo);
            return;
        }
    })
    setTimeout(() => this.idle(), 5);
}
