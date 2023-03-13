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

    if (player.direction === "left") {
        let refBox = buildReferenceBox("lowerLeft", { newX, newY });
        if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
            return { canMove: false, message: "Reach left wall" };
        }
    }

    if (player.direction === "right") {
        let refBox = buildReferenceBox("lowerRight", { newX, newY });
        if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
            return { canMove: false, message: "Reach right wall" };
        }
    }

    if (player.direction === "up") {
        if (player.faceTo === "right") {
            let refBox = buildReferenceBox("upperRight", { newX, newY, fixedFactor: -0.2 });
            if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
                if (newY - refBox.y < 0.2) {
                    return { canMove: false, message: "Reach up right wall" };
                }
            }
        }
        if (player.faceTo === "left") {
            let refBox = buildReferenceBox("upperLeft", { newX, newY });
            if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
                if (newY - refBox.y < 0.2) {
                    return { canMove: false, message: "Reach up left wall" };
                }
            }
        }
    }

    if (player.direction === "down") {
        if (player.faceTo === "right") {
            let refBox = buildReferenceBox("lowerRight", { newX, newY, fixedFactor: -0.35 });
            if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
                return { canMove: false, message: "Reach down right wall" };
            }
        }
        if (player.faceTo === "left") {
            let refBox = buildReferenceBox("lowerLeft", { newX, newY, fixedFactor: 0.35 });
            if (gameState.currentLevel.maze[refBox.y][refBox.x] === 1) {
                return { canMove: false, message: "Reach down left wall" };
            }
        }
    }

    return { canMove: true, mesage: "ok" };
}

