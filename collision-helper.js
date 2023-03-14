function buildReferenceBox(corner, { newX, newY, fixedFactor = 0 }) {
    if (!corner) {
        return;
    }
    if (newX < 0) {
        newX = 0;
    }
    if (newY < 0) {
        newY = 0;
    }
    if (corner === "lowerLeft") {
        return { x: Math.floor(newX + (fixedFactor ? fixedFactor : 0)), y: Math.floor(newY + 1) };
    }
    if (corner === "lowerRight") {
        return { x: Math.floor(newX + 1 + (fixedFactor ? fixedFactor : 0)), y: Math.floor(newY + 1) };
    }
    if (corner === "upperLeft") {
        return { x: Math.floor(newX), y: Math.floor(newY) };
    }
    if (corner === "upperRight") {
        return { x: Math.floor(newX + 1 + (fixedFactor ? fixedFactor : 0)), y: Math.floor(newY) };
    }
}

function findEnemies(x, y) {
    return gameState.currentEnemies.filter(enemy => enemy.x === x && enemy.y === y);
}

function enemiesDetection(player) {
    function __internal__footPlayerBox(direction, { pX, pY }) {
        if (player.direction === "left") {
            return { x: Math.floor(pX + 1), y: Math.floor(pY + 1) };
        }
        if (player.direction === "right") {
            return { x: Math.floor(pX), y: Math.floor(pY + 1) }
        }
        if (player.direction === "up" && player.faceTo === "right") {
            return { x: Math.floor(pX + 1), y: Math.floor(pY + 1) }
        }
        if (player.direction === "up" && player.faceTo === "left") {
            return { x: Math.floor(pX), y: Math.floor(pY + 1) }
        }
        if (player.direction === "down" && player.faceTo === "right") {
            return { x: Math.floor(pX + 1), y: Math.floor(pY) }
        }
        if (player.direction === "down" && player.faceTo === "left") {
            return { x: Math.floor(pX), y: Math.floor(pY + 1) }
        }
    }
    function __internal__findEnemiesByDirection(direction, footPlayerBox) {
        if (direction === "left") {
            return findEnemies(footPlayerBox.x - 1, footPlayerBox.y);
        }
        if (direction === "right") {
            return findEnemies(footPlayerBox.x + 1, footPlayerBox.y);
        }
        if (direction === "up") {
            return findEnemies(footPlayerBox.x, footPlayerBox.y - 1);
        }
        if (direction === "down") {
            return findEnemies(footPlayerBox.x, footPlayerBox.y + 1);
        }
    }
    let footPlayerBox = __internal__footPlayerBox(player.direction, { pX: player.x, pY: player.y });
    let enemies = __internal__findEnemiesByDirection(player.direction, footPlayerBox);

    return enemies && enemies.length > 0 ? enemies : [];
}

function collisionDetection(player, speed) {
    let { newX, newY } = player.applySpeed(speed);
    let mazeSize = {
        row: gameState.currentLevel.maze.length,
        column: gameState.currentLevel.maze[0].length
    }

    if (newX < 0 || newX > mazeSize.row - 1) {
        return { canMove: false, message: "Reach boderiline (left/right)" };
    }

    if (newY < 0 || newY > mazeSize.column - 1) {
        return { canMove: false, message: "Reach boderiline (top/bottom)" };
    }

    if (isWholeNumber(speed)) {
        if (gameState.currentLevel.maze[newY][newX] === 1) {
            return { canMove: false, message: "Reach wall" };
        }
        return { canMove: true, message: "ok" };
    }

    if (isWholeNumber(newX)) {
        newX -= 0.01;
    }
    if (isWholeNumber(newY)) {
        newY -= 0.01;
    }

    function __internal__collisionDectection(player, corner,
        { pX, pY, pfixedFactor = 0 },
        reachTheWall = function(refBox) {
            return { canMove: false, message: "Reach " + player.direction + " wall" };
        },
        foundEnemies = function(enemies) {
            return { canMove: false, message: "has enmies", enemies: enemies };
        },
        somethingElse = function() {
            return { canMove: true, mesage: "ok" };
        }
    ) {
        let refBox = buildReferenceBox(corner, { newX: pX, newY: pY, fixedFactor: pfixedFactor });
        if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
            let res = reachTheWall(refBox);
            if (!res.canMove) {
                return res;
            }
        }
        let enemies = enemiesDetection(player);
        if (enemies && enemies.length > 0) {
            return foundEnemies(enemies);
        }
        return somethingElse();
    }

    if (player.direction === "left") {
        return __internal__collisionDectection(player, "lowerLeft", { pX: newX, pY: newY })
    }

    if (player.direction === "right") {
        return __internal__collisionDectection(player, "lowerRight", { pX: newX, pY: newY })
    }

    if (player.direction === "up" && player.faceTo === "right") {
        return __internal__collisionDectection(player, "upperRight", { pX: newX, pY: newY, pfixedFactor: -0.2 },
            reachTheWall = function(refBox) {
                if (newY - refBox.y < 0.2) {
                    return { canMove: false, message: "Reach up right wall" };
                }
                return { canMove: true, mesage: "next step" };
            });
    }

    if (player.direction === "up" && player.faceTo === "left") {
        return __internal__collisionDectection(player, "upperLeft", { pX: newX, pY: newY },
            reachTheWall = function(refBox) {
                if (newY - refBox.y < 0.2) {
                    return { canMove: false, message: "Reach up left wall" };
                }
                return { canMove: true, mesage: "next step" };
            }
        );
    }

    if (player.direction === "down" && player.faceTo === "right") {
        return __internal__collisionDectection(player, "lowerRight", { pX: newX, pY: newY, pfixedFactor: -0.35 })
    }

    if (player.direction === "down" && player.faceTo === "left") {
        return __internal__collisionDectection(player, "lowerLeft", { pX: newX, pY: newY, pfixedFactor: 0.35 })
    }

    return { canMove: true, mesage: "ok" };
}

