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

const GHOST_1_ANIMATION = {
    flying: {
        frames: 9,
        loc: [
            { x: 1, y: 6, w: 41, h: 66 },
            { x: 103, y: 5, w: 41, h: 67 },
            { x: 205, y: 3, w: 39, h: 69 },
            { x: 306, y: 1, w: 45, h: 71 },
            { x: 409, y: 1, w: 46, h: 71 },
            { x: 518, y: 4, w: 42, h: 68 },
            { x: 621, y: 6, w: 41, h: 66 },
            { x: 723, y: 6, w: 41, h: 66 },
            { x: 828, y: 4, w: 41, h: 68 },
        ]
    },
    killed: {
        frames: 8,
        loc: [
            { x: 7, y: 195, w: 54, h: 70 },
            { x: 103, y: 190, w: 57, h: 74 },
            { x: 222, y: 221, w: 57, h: 42 },
            { x: 330, y: 233, w: 53, h: 30 },
            { x: 444, y: 243, w: 43, h: 20 },
            { x: 547, y: 246, w: 44, h: 17 },
            { x: 651, y: 247, w: 43, h: 15 },
            { x: 754, y: 247, w: 43, h: 15 },
        ]
    }
}
