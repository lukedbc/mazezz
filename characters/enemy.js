function EnemyEntity({
    startPos,
}) {
    this.x = startPos.x;
    this.y = startPos.y;
    this.width = CONFIG.asset.width;
    this.height = CONFIG.asset.height;
    this.speed = Math.random() * 4 - 2;
    this.currentState = {
        type: "idle",
        name: "idle"
    }
}
