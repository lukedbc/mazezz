const PLAYER_CONTROLLER = {
    move: {
        left: ["ArrowLeft", "Left", "a", "h"],
        right: ["ArrowRight", "Right", "d", "l"],
        up: ["ArrowUp", "Up", "w", "k"],
        down: ["ArrowDown", "Down", "s", "j"]
    },
    attack: ["Shift", "Control"],
    debug: ["F1"],
    supportedKeys: function() {
        let res = [];
        res.push(this.move.left, this.move.right, this.move.up, this.move.down);
        res.push(this.attack);
        res.push(this.debug);
        return res.flatMap(arr => arr);
    },
    mapKeyToAction: function(keyCode) {
        if (this.move.left.indexOf(keyCode) != -1) {
            return { type: "move", direction: "left" };
        }
        if (this.move.right.indexOf(keyCode) != -1) {
            return { type: "move", direction: "right" };
        }
        if (this.move.up.indexOf(keyCode) != -1) {
            return { type: "move", direction: "up" };
        }
        if (this.move.down.indexOf(keyCode) != -1) {
            return { type: "move", direction: "down" };
        }
        if (this.attack.indexOf(keyCode) != -1) {
            return { type: "attack" };
        }

        return null;
    }
}

function InputHandler() {
    this.supportedKeys = PLAYER_CONTROLLER.supportedKeys();
    this.actions = [];

    window.addEventListener("keydown", e => {
        if (this.supportedKeys.indexOf(e.key) != -1) { // can't multiple add the same actions
            if (e.key === "F1") {
                CONFIG.game.debug = true;
                return;
            }
            let action = PLAYER_CONTROLLER.mapKeyToAction(e.key);
            let actionAsString = action.type + "." + (action.direction ? action.direction : "");
            if (this.actions.indexOf(actionAsString) === -1) {
                this.actions.push(actionAsString);
            }
        }
    });


    window.addEventListener("keyup", e => {
        if (this.supportedKeys.indexOf(e.key) != -1) {
            let action = PLAYER_CONTROLLER.mapKeyToAction(e.key);
            if (action) {
                let actionAsString = action.type + "." + action.direction;
                this.actions.splice(this.actions.indexOf(actionAsString), 1);
            }
        }
    })
}

InputHandler.prototype.reset = function() {
    this.supportedKeys = PLAYER_CONTROLLER.supportedKeys();
    this.actions = [];
}
