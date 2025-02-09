class Menu extends Phaser.Scene {
    constructor() {
        super("LoadScene");
    }
    init() {}
    preload() {
        this.load.path = "./assets/";
        this.load.spritesheet("slug", "slug.png", {
            frameWidth: 8,
            frameHeight: 8,
        });
    }
    create() {
        // start text
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
                "Trilife Shuffle",
                menuConfig
            )
            .setOrigin(0.5);

        this.add
            .text(
                game.config.width / 2,
                (game.config.height / 4) * 3,
                "Press any key to start",
                menuConfig
            )
            .setOrigin(0.5);
        // animations
        this.anims.create({
            key: "move",
            frameRate: 24,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("slug", {
                start: 0,
                end: 2,
            }),
        });

        this.input.keyboard.on("keydown", () => {
            this.scene.start("playScene");
            console.log("PLAY SCENE");
        });
    } 
    update() {}
}