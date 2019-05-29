var scene = new Phaser.Scene("jeu");
var joueur;
var dragon;
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale: {
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    }
};

var space;
var move = 0

var game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('tresor', 'assets/treasure.png');
    this.load.image('dragon', 'assets/dragon.png');
}

function create() {

    //ajout du background
    this.add.image(400, 300, 'background');

    //ajout du joueur
    joueur = this.physics.add.image(20, 300, 'player');
    joueur.setScale(0.7);
    joueur.setCollideWorldBounds(true);

    //ajout du trésor
    this.add.image(725, 145, 'tresor').setScale(0.7);

    //ajout du dragon
    dragon = this.add.image(500, 120, 'dragon').setScale(0.7);
    dragon.flipX = true;
    dragon.direction = 1;
    dragons = this.add.group({
        key: 'dragon',
        repeat: 4,
        setXY: { x: 600, y: 100, stepX: -100 }
    });
    dragons.children.iterate(function (child) {

        child.setScale(0.7)
        child.flipX = true;
        child.direction = 1;;
    
    });

    //gestion des entrées de l'utilisateur
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update() {
    //le dragon regarde toujours le joueur
    if (joueur.x > dragon.x) {
        dragon.flipX = false;
    }
    else {
        dragon.flipX = true;
    }

    //déplacement du joueur
    if (space.isDown && move == 0) {
        joueur.x = joueur.x + 20;
        move = 1;
    } else if (space.isUp) {
        move = 0;
    }

    //déplacement du dragon
    if (dragon.y > 520) {
        dragon.direction += -1;
    }
    if (dragon.y < 80) {
        dragon.direction += 1;
    }
    dragon.y += dragon.direction;

    //groupe de dragons
    dragons.children.iterate(function (child) {
        if (joueur.x > child.x) {
                child.flipX = false;
            }
            else {
                child.flipX = true;
            }

            if (child.y > 520) {
                child.direction += -1;
            }
            if (child.y < 80) {
                child.direction += 1;
            }
            child.y += child.direction;
});
}
