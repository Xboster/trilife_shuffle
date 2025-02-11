class Building extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.body.setSize(15, 9);

        this.isActive = false;

        this.anims.create({
            key: "active",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(texture, {
                start: 0,
                end: 1,
            }),
        });

        // initialize state machine managing building (initial state, possible states, state args[])
        this.buildingFSM = new StateMachine(
            "idle",
            {
                idle: new IdleState(),
                active: new ActiveState(),
            },
            [scene, this]
        ); // pass these as arguments to maintain scene/object context in the FSM
    }
}
class IdleState extends State {
    enter(scene, building) {
        building.anims.stop();
    }
    execute(scene, building) {
        if (building.isActive) {
            this.stateMachine.transition("active");
            return;
        }
    }
}
class ActiveState extends State {
    enter(scene, building) {
        building.anims.play("active");
        scene.eventEmitter.once("buildingTouched", (building) => {
            // console.log(slug.x + ", " + slug.y + ": ", slug.direction);
            // set another building to active
            let otherBuilding;
            do {
                otherBuilding =
                    scene.buildings.getChildren()[
                        Phaser.Math.Between(0, scene.buildings.getLength() - 1)
                    ];
            } while (otherBuilding == building);
            otherBuilding.isActive = true;

            building.isActive = false;
            building.setFrame(0);

            scene.sound.play("pointsEffect");
        });
    }
    execute(scene, building) {
        if (!building.isActive) {
            this.stateMachine.transition("idle");
            return;
        }
    }
}
