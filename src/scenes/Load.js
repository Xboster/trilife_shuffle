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
        this.load.spritesheet("bus", "bus.png", {
            frameWidth: 8,
            frameHeight: 8,
        });

        this.load.spritesheet("UC", "UC.png", {
            frameWidth: 15,
            frameHeight: 9,
        });
        this.load.spritesheet("store", "store.png", {
            frameWidth: 15,
            frameHeight: 9,
        });
        this.load.spritesheet("downtown", "downtown.png", {
            frameWidth: 15,
            frameHeight: 9,
        });

        this.load.audio("backgroundMusic", "song.wav");
        this.load.audio("doorEffect", "door.wav");
        this.load.audio("loseEffect", "lose.wav");
        this.load.audio("pointsEffect", "points.wav");
        this.load.audio("slugEffect", "slug.wav");
    }
    create() {
        this.scale.setGameSize(200, 200);
        // start text
        let menuConfig = {
            fontFamily: "Courier New",
            fontSize: "16px",
            // backgroundColor: "#00FF00",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };

        // menuConfig.backgroundColor = "#00FF00";
        // menuConfig.color = "#000";
        this.add
            .text(
                game.config.width / 2,
                game.config.height / 4,
                "Trilife Shuffle",
                menuConfig
            )
            .setOrigin(0.5);
        this.add
            .text(
                game.config.width / 2,
                game.config.height / 3,
                "made by Leon Ng",
                menuConfig
            )
            .setOrigin(0.5);

        this.add
            .text(
                game.config.width / 2,
                (game.config.height * 2) / 3,
                "Press any key\nto play",
                menuConfig
            )
            .setOrigin(0.5);
        (menuConfig.color = "#050505"),
            this.add
                .text(
                    game.config.width / 2,
                    (game.config.height * 5) / 6,
                    "Press d key for\ndebug mode",
                    menuConfig
                )
                .setOrigin(0.5);
        // animations
        this.anims.create({
            key: "move",
            frameRate: 16,
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
