function EnemyEntity({
    startPos,
    enemyType
}) {
    this.x = startPos.x;
    this.y = startPos.y;
    this.width = CONFIG.asset.width;
    this.height = CONFIG.asset.height;
    this.speed = Math.random() * 4 - 2;
    this.currentState = null;
    this.type = enemyType;
}

EnemyEntity.prototype.changeState = function({ type, name }) {
    this.currentState = {
        type: type,
        name: name
    };
}


const ENEMY_TYPE_INFO = {
    "ghost-1": {
        states: ["flying", "killed"],
        defaultState: "flying"
    }
}
