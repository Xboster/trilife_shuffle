class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {}
    preload() {}
    create() {
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
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
                game.config.height / 2 - borderUISize - borderPadding,
                "Play Scene",
                menuConfig
            )
            .setOrigin(0.5);
    }
    update() {}
}
