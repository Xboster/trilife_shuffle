class Slug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture, direction);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(this.width / 2, this.height / 3);
        this.body.setCollideWorldBounds(true);

        this.direction = direction;
        this.velocity = 40;
        this.onBus = null;

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
        slug.body.enable = false;
    }
    execute(scene, slug) {
        this.onBus = scene.busses
            .getChildren()
            .find((bus) => bus.hasPlayer == true);
        slug.direction = this.onBus.direction > 0 ? 1 : -1;
        slug.x = this.onBus.x + 5 * slug.direction;
        slug.y = this.onBus.y;
        slug.setFlipX(slug.direction == -1 ? true : false);

        // on any key get off bus
        scene.input.keyboard.keys.forEach((key) => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                console.log("Pressed key to exit bus");
                this.stateMachine.transition("move");
                return;
            }
        });
    }
}

class MoveState extends State {
    enter(scene, slug) {
        slug.setAlpha(1);
        slug.anims.play(`move`, true);

        // getting off bus
        if (slug.body.enable == false) {
            let playerBus = scene.busses
                .getChildren()
                .find((bus) => bus.hasPlayer == true);
            playerBus.hasPlayer = false;
            playerBus.setTintFill(0xffffff);

            console.log("GOT OFF BUS");
            slug.body.enable = true;
        }

        scene.eventEmitter.once("busBoarded", (bus) => {
            console.log(slug.x + ", " + slug.y + ": ", slug.direction);
            this.stateMachine.transition("idle");
            return;
        });
    }
    execute(scene, slug) {
        // on any key flip slug
        Object.values(scene.input.keyboard.keys).forEach((key) => {
            if (Phaser.Input.Keyboard.JustDown(key)) {
                slug.direction *= -1;
                console.log(`Key pressed: ${key.name}`);
            }
        });

        slug.setFlipX(slug.direction == -1 ? true : false);

        if (slug.direction == -1 && slug.x > 39) {
            slug.velocity = 40;
        } else if (slug.direction == -1 && slug.x <= 39) {
            slug.velocity = 0;
        }
        if (slug.direction == 1 && slug.x < 61) {
            slug.velocity = 40;
        } else if (slug.direction == 1 && slug.x >= 61) {
            slug.velocity = 0;
        }

        slug.setVelocity(
            slug.velocity * slug.direction,
            slug.velocity * 0 // always 0
        );
        // console.log(slug.x + ", " + slug.y + ": ", slug.direction);
    }
}
