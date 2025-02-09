class Slug extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture, direction);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(this.width / 2, this.height / 3);
        this.body.setCollideWorldBounds(true);

        this.direction = direction;
        this.velocity = 20;

        // initialize state machine managing Slug (initial state, possible states, state args[])
        scene.slugFSM = new StateMachine(
            "move",
            {
                idle: new IdleState(),
                move: new MoveState(),
            },
            [scene, this]
        ); // pass these as arguments to maintain scene/object context in the FSM
    }
}

class IdleState extends State {
    enter(scene, slug) {
        d;
        slug.setVelocity(0);
        slug.setAlpha(1);

        // slug.anims.stop();
    }
    execute(scene, slug) {}
}

class MoveState extends State {
    enter(scene, slug) {}
    execute(scene, slug) {
        slug.setAlpha(1);
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        // x, y speed

        moveDirection.x = 1;

        moveDirection.normalize();
        slug.setVelocity(
            slug.velocity * moveDirection.x,
            slug.velocity * moveDirection.y
        );
        // slug.anims.play(`walk-${slug.direction}`, true);
    }
}
