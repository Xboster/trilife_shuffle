class Bus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture, direction);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(4, 7);
        // this.body.setCollideWorldBounds(true);
        this.hasPlayer = null;
        this.direction = -direction;
        this.velocity = 50;
        this.wait = 0;

        // initialize state machine managing bus (initial state, possible states, state args[])
        this.busFSM = new StateMachine(
            "move",
            {
                idle: new ParkState(),
                move: new DriveState(),
            },
            [scene, this]
        ); // pass these as arguments to maintain scene/object context in the FSM
    }
}

class ParkState extends State {
    enter(scene, bus) {
        bus.setVelocity(0);
        bus.setAlpha(1);
    }
    execute(scene, bus) {
        // console.log(bus.wait);
        bus.wait -= scene.sys.game.loop.delta;
        if (bus.wait <= 0) {
            this.stateMachine.transition("move");
            return;
        }
    }
}

class DriveState extends State {
    enter(scene, bus) {
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        // bus.setAlpha(1);
        // x, y speed

        moveDirection.y = bus.direction;

        moveDirection.normalize();
        bus.setVelocity(
            bus.velocity * moveDirection.x,
            bus.velocity * moveDirection.y
        );
        // console.log("ENTERED DRIVE STATE");
        scene.eventEmitter.once("busBoarded", (bus) => {
            bus.setTintFill(0xffbf00);
            bus.wait = 300;
        });

        scene.eventEmitter.once("busExited", (bus) => {
            bus.setTintFill(0xffffff);
            bus.wait = 400;
        });
    }
    execute(scene, bus) {
        // make bus wait
        if (bus.wait > 0) {
            this.stateMachine.transition("idle");
            return;
        }

        // Wrap bus around world
        if (bus.y < -8 && bus.x == 65) {
            // console.log(bus.x + ", " + bus.y);
            bus.x = 35;
            bus.setFlipX(!bus.flipY);
            bus.direction *= -1;
            this.stateMachine.transition("move");
            return;
        }
        if (bus.y > 108 && bus.x == 35) {
            // console.log(bus.x + ", " + bus.y);
            bus.x = 65;
            bus.setFlipX(!bus.flipY);
            bus.direction *= -1;
            this.stateMachine.transition("move");
            return;
        }

        // function movebus(bus) {
        scene.busses.getChildren().forEach((otherBus) => {
            if (otherBus.wait > 0 && bus != otherBus && bus.x == otherBus.x) {
                if (
                    bus.direction == -1 &&
                    bus.y > otherBus.y &&
                    bus.y < otherBus.y + 15
                ) {
                    bus.wait = 400;
                }
                if (
                    bus.direction == 1 &&
                    bus.y > otherBus.y - 15 &&
                    bus.y < otherBus.y
                ) {
                    bus.wait = 400;
                }
            }
        });
    }
}
