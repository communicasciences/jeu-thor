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
var bond = 20;
var nouvxDeplacmnt = 0;
var tresor;
var score = 0;
var scoreText;

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
    tresor = this.physics.add.image(725, 300, 'tresor').setScale(0.7);

    //ajout du dragon
    dragon = this.add.image(500, 120, 'dragon').setScale(0.7);
    dragon.flipX = true;
    dragon.direction = 1;

    //gestion des entrées de l'utilisateur
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.overlap(joueur, tresor, getTresor, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
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
    if (space.isDown && bond == 20 && nouvxDeplacmnt == 0) {
        bond = 0;
        nouvxDeplacmnt = 1;
    }
    if (bond < 20) {
        joueur.x = joueur.x + 1;
        bond = bond + 1;
    }
    if (space.isUp) {
        nouvxDeplacmnt = 0;
    }

    //déplacement du dragon
    if (dragon.y > 520) {
        dragon.direction += -1;
    }
    if (dragon.y < 80) {
        dragon.direction += 1;
    }
    dragon.y += dragon.direction;
}

function getTresor(joueur, tresor) {

    tresor.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

}