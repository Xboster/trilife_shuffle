// Leon Ng
// Trilife Shuffle
let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
