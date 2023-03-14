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
    this.awards = [];
}

EnemyEntity.prototype.changeState = function({ type, name }) {
    this.currentState = {
        type: type,
        name: name
    };
}

EnemyEntity.prototype.setAwards = function(awards) {
    if (!awards) {
        return;
    }
    this.awards = awards;
}

const ENEMY_TYPE_INFO = {
    "ghost-1": {
        states: ["flying", "killed"],
        defaultState: "flying",
        awards: [
            new AwardInfo({ name: "exp", type: "character-status", object: { min: 100, max: 200 } }),
            new AwardInfo({ name: "point", type: "character-status", object: { min: 200, max: 400 } }),
        ]
    }
}
