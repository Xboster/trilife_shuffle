class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        this.eventEmitter = new Phaser.Events.EventEmitter();
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

        this.keys = {};
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

        // add new Slug to scene (scene, x, y, key, direction)
        this.slug = new Slug(this, 50, 40, "slug", 1);

        // add new Bus to scene (scene, x, y, key, direction)
        this.bus1 = new Bus(this, 65, 50, "bus", 1);
        this.bus2 = new Bus(this, 65, 70, "bus", 1);
        this.bus3 = new Bus(this, 65, 90, "bus", 1);

        this.busses = this.add.group([this.bus1, this.bus2, this.bus3]);
    }
    update(time, delta) {
        // make sure we step (ie update) the slug's state machine
        this.slug.slugFSM.step();
        this.bus1.busFSM.step();
        this.bus2.busFSM.step();
        this.bus3.busFSM.step();

        this.physics.add.overlap(this.busses, this.slug, (bus, slug) => {
            bus.hasPlayer = true;
            bus.setTintFill(0xffbf00);
            this.eventEmitter.emit("busBoarded", bus);
            // console.log("GOT ON BUS");
            return;
        });
    }
}
