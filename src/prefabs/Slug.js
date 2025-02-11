class Slug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture, direction);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(5, 4);
        this.body.setOffset(2, 1);
        this.body.setCollideWorldBounds(true);

        this.direction = direction;
        this.speed = 40;
        this.bus = null;

        // initialize state machine managing Slug (initial state, possible states, state args[])
        this.slugFSM = new StateMachine(
            "move",
            {
                idle: new OnBus(),
                move: new MoveState(),
            },
            [scene, this]
        ); // pass these as arguments to maintain scene/object context in the FSM
    }
}

class OnBus extends State {
    enter(scene, slug) {
        slug.direction = 0;
        slug.setAlpha(0);
        // slug.body.enable = false;
    }
    execute(scene, slug) {
        // this.onBus = scene.busses
        //     .getChildren()
        //     .find((bus) => bus.hasPlayer == slug);
        if (slug.bus) {
            slug.direction = slug.bus.direction > 0 ? 1 : -1;
            slug.x = slug.bus.x + 5 * slug.direction;
            slug.y = slug.bus.y;
            slug.setFlipX(slug.direction == -1 ? true : false);
        }

        // on any key get off bus
        scene.input.keyboard.keys.forEach((key) => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                console.log("Pressed key to exit bus");
                if (slug.bus != null && slug.y > 5 && slug.y < 95) {
                    scene.eventEmitter.emit("busExited", slug.bus);
                    slug.bus.setTintFill(0xffffff);
                    this.stateMachine.transition("move");
                    return;
                }
            }
        });
    }
}

class MoveState extends State {
    enter(scene, slug) {
        slug.setAlpha(1);
        slug.setFlipX(slug.direction == -1 ? true : false);
        if (slug.bus) {
            // slug.bus.setTintFill(0xffffff);
            slug.bus = null;
        }

        // slug.x = Math.floor(slug.x);
        slug.y = Math.floor(slug.y);

        scene.eventEmitter.once("busBoarded", (bus) => {
            // console.log(slug.x + ", " + slug.y + ": ", slug.direction);
            slug.bus = bus;
            slug.setVelocity(0);
            this.stateMachine.transition("idle");
            return;
        });
    }
    execute(scene, slug) {
        // on any key flip slug
        Object.values(scene.input.keyboard.keys).forEach((key) => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                slug.direction *= -1;
                // console.log(`Key pressed: ${key.name}`);
            }
        });

        slug.setFlipX(slug.direction == -1 ? true : false);

        if (slug.direction == -1 && slug.x > 39) {
            slug.speed = 40;
        } else if (slug.direction == -1 && slug.x <= 39) {
            slug.speed = 0;
        }
        if (slug.direction == 1 && slug.x < 61) {
            slug.speed = 40;
        } else if (slug.direction == 1 && slug.x >= 61) {
            slug.speed = 0;
        }

        slug.setVelocity(
            slug.speed * slug.direction,
            slug.speed * 0 // always 0
        );

        if (slug.speed > 0) {
            slug.anims.play("move", true);
        } else {
            slug.anims.play("move", false);
        }
        // console.log(slug.x + ", " + slug.y + ": ", slug.direction);
    }
}
