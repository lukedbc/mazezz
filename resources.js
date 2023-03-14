function Resources() {
    function __internal__initContext() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = (CONFIG.maze.row + 4) * CONFIG.asset.width;
        canvas.height = (CONFIG.maze.column + 2) * CONFIG.asset.height;

        CONFIG.canvas = {
            width: canvas.width,
            height: canvas.height
        };
        context.strokeStyle = "#FF0000";

        document.body.appendChild(canvas);

        return context;
    }

    function __internal__initAssets() {
        const assets = {}

        assets["background"] = new ImageAsset("assets/background.jpg");
        assets["tree"] = new ImageAsset("assets/tree.png");
        assets["road"] = new ImageAsset("assets/road.png");
        assets["player"] = new ImageAsset("assets/player-2.png");
        assets["ghost-1"] = new ImageAsset("assets/ghost-1.png");

        return assets;
    }

    function __internal__initMessages() {
        return `{
            "time.out": "Time out!!! You lose",
            "clear.level": "You win!!!",
            "killed": "You die!!!"
        }`
    }

    this.context = __internal__initContext();
    this.assets = __internal__initAssets();
    this.messages = JSON.parse(__internal__initMessages());
}
