function PlayerEntity({
    startPos,
}) {
    this.x = startPos.x;
    this.y = startPos.y;
    this.width = CONFIG.asset.width;
    this.height = CONFIG.asset.height;
    this.speed = 2.5;
    this.faceTo = "right";
    this.direction = "right";
    this.currentState = {
        type: "idle",
        name: "idle" + this.faceTo.capitalize()
    }

    this.point = 0;
    this.exp = 0;

    this.movingSound = new Audio();
    this.movingSound.src = "assets/running.wav";

    this.attackSound = new Audio();
    this.attackSound.src = "assets/attack.flac";
}

PlayerEntity.prototype.applyAwards = function(awards) {
    if (!awards) {
        return;
    }
    awards.forEach(award => {
        if (award.type === "character-status") {
            if (award.isUsed) {
                return;
            }
            if (award.name === "point") {
                this.point += award.object.point;
            } else if (award.name === "exp") {
                this.exp += award.object.point;
            }
            award.isUsed = true;
        }
    });
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
        let result = collisionDetection(player, speed);
        if (!result) {
            return;
        }

        if (result.canMove) {
            let { newX, newY } = player.applySpeed(speed);

            player.x = newX;
            player.y = newY;

            return;
        }
        if (result.enemies) {
            player.attack();
            result.enemies.forEach(enemy => {
                enemy.changeState({
                    type: "killed",
                    name: "killed"
                });
                player.applyAwards(enemy.awards);
            });
        }
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
            this.niceMove(direction, deltaTime);
            // this.move(direction);
            return;
        }
        if (type === "attack") {
            this.attack(this.faceTo);
            return;
        }
    })
    setTimeout(() => this.idle(), 50);
}

PlayerEntity.prototype.isAttacking = function() {
    return this.currentState.type === "attack";
}
