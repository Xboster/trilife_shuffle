// Leon Ng
// Trilife Shuffle
// Hours spent:

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    // game size
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 1,
        width: 200,
        height: 200,
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            //    x: 0,
            //    y: 0,
            //    width: scene.sys.scale.width,
            //    height: scene.sys.scale.height,
            //    gravity: {
            //        x: 0,
            //        y: 0
            //    },
            //    checkCollision: {
            //        up: true,
            //        down: true,
            //        left: true,
            //        right: true
            //    },
            //    customUpdate: false,
            //    fixedStep: true,
            //    fps: 60,
            //    timeScale: 1,     // 2.0 = half speed, 0.5 = double speed
            //    customUpdate: false,
            //    overlapBias: 4,
            //    tileBias: 16,
            //    forceX: false,
            //    isPaused: false,
            //    debug: false,
            //    debugShowBody: true,
            //    debugShowStaticBody: true,
            //    debugShowVelocity: true,
            //    debugBodyColor: 0xff00ff,
            //    debugStaticBodyColor: 0x0000ff,
            //    debugVelocityColor: 0x00ff00,
            //    maxEntries: 16,
            //    useTree: true   // set false if amount of dynamic bodies > 5000
        },
    },
    scene: [Menu, Play],
    // ...
};
const game = new Phaser.Game(config);
