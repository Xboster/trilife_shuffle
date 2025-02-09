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
        scene.slugFSM = new StateMachine(
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
        slug.setAlpha(1);

        // slug.anims.stop();
    }
    execute(scene, slug) {
        const { space } = scene.keys;
        if (Phaser.Input.Keyboard.JustDown(space)) {
            slug.direction *= -1;
            console.log("PRESSED SPACE");
            this.stateMachine.transition("move");
            return;
        }
    }
}

class MoveState extends State {
    enter(scene, slug) {
        slug.setAlpha(1);
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        // x, y speed

        moveDirection.x = slug.direction;

        moveDirection.normalize();
        slug.setVelocity(
            slug.velocity * moveDirection.x,
            slug.velocity * moveDirection.y
        );
        slug.anims.play(`move`, true);
    }
    execute(scene, slug) {
        const { space } = scene.keys;
        if (Phaser.Input.Keyboard.JustDown(space)) {
            slug.direction *= -1;
            slug.setFlipX(!slug.flipX);
            // console.log("PRESSED SPACE");
            this.stateMachine.transition("move");
            return;
        }
    }
}
