class Slug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture, direction);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(this.width / 2, this.height / 3);
        this.body.setCollideWorldBounds(true);

        this.direction = direction;
        this.velocity = 40;

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
        slug.setVelocity(0);
        slug.setAlpha(0);
        slug.anims.stop();
    }
    execute(scene, slug) {}
}

class MoveState extends State {
    enter(scene, slug) {
        slug.setAlpha(1);
        slug.anims.play(`move`, true);

        // swap direction on any keyboard press
        scene.input.keyboard.on("keydown", () => {
            slug.direction *= -1;
        });

        // swap direction on any mouse key press
        scene.input.on("pointerdown", () => {
            slug.direction *= -1;
        });
    }
    execute(scene, slug) {
        slug.setFlipX(slug.direction == -1 ? true : false);
        slug.setVelocity(
            slug.velocity * slug.direction,
            slug.velocity * 0 // always 0
        );
        // bus overlap
        scene.physics.add.overlap(scene.busses, slug, (bus, slug) => {
            slug.body.enable = false;
            bus.hasPlayer = true;
            bus.setTintFill(0xffbf00);
            console.log("GOT ON BUS");
            this.stateMachine.transition("idle");
            return;
        });
    }
}
