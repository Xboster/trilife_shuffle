class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        this.eventEmitter = new Phaser.Events.EventEmitter();
    }
    init() {}
    preload() {}
    create() {
        this.cameras.main.setZoom(1);
        this.scale.setGameSize(100, 100);
        this.textConfig = {
            fontFamily: "Courier",
            fontSize: "10px",
            color: "#FFFFFF",
            align: "left",
            fixedWidth: 0,
        };

        this.keys = {};
        // all keys
        Object.values(Phaser.Input.Keyboard.KeyCodes).forEach((keyCode) => {
            this.keys[keyCode] = this.input.keyboard.addKey(keyCode);
        });

        this.input.on("pointerdown", (pointer) => {
            console.log("Mouse clicked at position: ", pointer.x, pointer.y);
        });
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

        // add new Bus to scene (scene, x, y, key, direction)
        this.bus1 = new Bus(this, 65, 50, "bus", 1);
        this.bus2 = new Bus(this, 65, 70, "bus", 1);
        this.bus3 = new Bus(this, 65, 90, "bus", 1);

        this.busses = this.add.group([this.bus1, this.bus2, this.bus3]);

        // add new Building to scene (scene, x, y, key)
        this.building1 = new Building(this, 50, 20, "UC");
        this.building2 = new Building(this, 50, 50, "store");
        this.building3 = new Building(this, 50, 80, "downtown");

        this.buildings = this.add.group([
            this.building1,
            this.building2,
            this.building3,
        ]);

        this.score = 0;

        // add new Slug to scene (scene, x, y, key, direction)
        this.slug = new Slug(this, 50, 40, "slug", 1);
        // this.slug = new Slug(this, 50, 14.5, "slug", 0);

        this.physics.add.overlap(this.busses, this.slug, (bus, slug) => {
            this.eventEmitter.emit("busBoarded", bus);
            // console.log("GOT ON BUS");
        });

        this.physics.add.overlap(
            this.buildings,
            this.slug,
            (building, slug) => {
                if (slug.bus == null && building.isActive) {
                    this.eventEmitter.emit("buildingTouched", building);
                    // console.log("TOUCHED at" + slug.y);
                }
            }
        );

        // this.allInactive = true;

        // this.buildings.getChildren().forEach((building) => {
        //     if (building.isActive == true) {
        //         this.allInactive = false;
        //     }
        // });

        // if(this.allInactive){

        // set one random building to active
        this.buildings.getChildren()[
            Phaser.Math.Between(0, this.buildings.getLength() - 1)
        ].isActive = true;

        this.timeLeft = 10;
        this.score = 0;
        this.multiplyer = 1;
        this.difficulty = 1;

        this.eventEmitter.on("buildingTouched", (building) => {
            this.score += 100 * this.multiplyer;
            this.multiplyer += 1;
            this.timeLeft += 2;
        });

        this.timer = this.add
            .text(
                game.config.width / 10,
                game.config.height / 4,
                this.timeLeft,
                this.textConfig
            )
            .setOrigin(0.5);

        this.scoreText = this.add
            .text(0, 0, this.score, this.textConfig)
            .setOrigin(0);
    }
    update(time, delta) {
        // make sure we step (ie update) the slug's state machine
        this.slug.slugFSM.step();

        // make sure we step (ie update) the bus' state machine
        this.bus1.busFSM.step();
        this.bus2.busFSM.step();
        this.bus3.busFSM.step();

        // make sure we step (ie update) the buildings' state machine
        this.building1.buildingFSM.step();
        this.building2.buildingFSM.step();
        this.building3.buildingFSM.step();

        // console.log(this.timeLeft);
        this.timeLeft -= delta / 1000;
        this.timer.setText(this.timeLeft.toFixed(1));
        this.scoreText.setText(this.score);

        // difficulty goes up as game goes on
        this.difficulty += (delta / 1000) * 0.02;
        // console.log(this.difficulty);
    }
}
