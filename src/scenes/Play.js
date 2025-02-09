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
        this.keys = this.input.keyboard.createCursorKeys();
        // debug key listener (assigned to D key)
        this.input.keyboard.on(
            "keydown-D",
            function () {
                this.physics.world.drawDebug = this.physics.world.drawDebug
                    ? false
                    : true;
                this.physics.world.debugGraphic.clear();
            },
            this
        );

        // menuConfig.backgroundColor = "#00FF00";
        // menuConfig.color = "#000";
        // this.add
        //     .text(
        //         game.config.width / 2,
        //         game.config.height / 2,
        //         "Play Scene",
        //         menuConfig
        //     )
        //     .setOrigin(0.5);

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
        // road lines
        graphics.fillRect(56, 0, 1, 100);
        graphics.fillRect(58, 0, 1, 100);
        graphics.fillRect(44, 0, 1, 100);
        graphics.fillRect(42, 0, 1, 100);

        // add new Slug to scene (scene, x, y, texture, direction)
        this.slug = new Slug(this, 50, 40, "slug", 1);
    }
    update() {
        // make sure we step (ie update) the slug's state machine
        this.slugFSM.step();
    }
}
