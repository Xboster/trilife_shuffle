class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {}
    create() {
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "8px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };

        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add
            .text(
                game.config.width / 2,
                game.config.height / 2,
                "Play Scene",
                menuConfig
            )
            .setOrigin(0.5);

        var graphics = this.add.graphics();

        graphics.setDefaultStyles({
            lineStyle: {
                width: 1,
                color: 0x003c6c,
                alpha: 1,
            },
            fillStyle: {
                color: 0x003c6c,
                alpha: 1,
            },
        });
        graphics.fillRect(56, 0, 1, 100);
        graphics.fillRect(58, 0, 1, 100);
        graphics.fillRect(44, 0, 1, 100);
        graphics.fillRect(42, 0, 1, 100);
    }
    update() {}
}
