const PLAYER_ANIMATIONS = {
    idleRight: {
        frames: 5,
        width: 52,
        height: 60,
        loc: [
            { x: 0, y: 0 },
            { x: 52, y: 0 },
            { x: 104, y: 0 },
            { x: 152, y: 0 },
            { x: 208, y: 0 },
        ]
    },
    idleLeft: {
        frames: 5,
        width: 52,
        height: 60,
        loc: [
            { x: 1624, y: 0 },
            { x: 1572, y: 0 },
            { x: 1520, y: 0 },
            { x: 1468, y: 0 },
            { x: 1416, y: 0 },
        ]
    },
    moveRight: {
        frames: 7,
        width: 70,
        height: 54,
        loc: [
            { x: 262, y: 3 },
            { x: 332, y: 3 },
            { x: 402, y: 3 },
            { x: 472, y: 3 },
            { x: 542, y: 3 },
            { x: 612, y: 3 },
            { x: 682, y: 3 },
        ]
    },
    moveLeft: {
        frames: 7,
        width: 70,
        height: 54,
        loc: [
            { x: 1345, y: 3 },
            { x: 1275, y: 3 },
            { x: 1205, y: 3 },
            { x: 1135, y: 3 },
            { x: 1065, y: 3 },
            { x: 995, y: 3 },
            { x: 925, y: 3 },
        ]
    },
    attackRight: {
        frames: 2,
        loc: [
            { x: 357, y: 62, w: 105, h: 51 },
            { x: 463, y: 62, w: 75, h: 51 },
        ]
    },
    attackLeft: {
        frames: 2,
        loc: [
            { x: 1214, y: 62, w: 105, h: 51 },
            { x: 1138, y: 62, w: 75, h: 51 },
        ]
    }
}

const ENEMY_ANIMATIONS = {
    idle: {
        frames: 5,
        width: 48.25,
        height: 60,
        loc: [
            { x: 48.25, y: 0 },
            { x: 96.5, y: 0 },
            { x: 144.75, y: 0 },
            { x: 193, y: 0 },
            { x: 241.25, y: 0 }
        ]
    },
    move: {
        frames: 3,
        width: 42,
        height: 60,
        loc: [
            { x: 0, y: 0 },
            { x: 42, y: 0 },
            { x: 84, y: 0 }
        ]
    }
}
