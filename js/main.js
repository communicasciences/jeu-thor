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
var distance = 110;
var pas = 2.5; // selon la valeur de pas par rapport à la valeur de distance, il peut y avoir un bug, auquel cas le personage n'avance qu'une seule fois
var bond = distance;
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
    joueur = this.physics.add.image(105, 300, 'player');
    joueur.setScale(0.7);
    joueur.setCollideWorldBounds(true);

    //ajout du trésor
    tresor = this.physics.add.image(725, 300, 'tresor').setScale(0.7);

        //ajout des dragons
        dragons = this.physics.add.group({
                key: 'dragon',
                repeat: 4,
                setXY: { x: 600, y: 100, stepX: -110 }
        });
        dragons.children.iterate(function (child) {

                child.setScale(0.7)
                child.flipX = true;
                child.direction = 1;
                child.y = Phaser.Math.Between(80, 520);
                child.direction = Phaser.Math.Between(1, 30) / 10;

                if (Phaser.Math.Between(0, 1) == 1) {

            child.direction *= -1;

                };
        });
        this.physics.add.collider(joueur, dragons, function () {
                this.scene.start();
        }, null, this);

    //gestion des entrées de l'utilisateur
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.overlap(joueur, tresor, getTresor, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
}

function update() {
    //déplacement du joueur
    if (space.isDown && bond == distance && nouvxDeplacmnt == 0) {
        bond = 0;
        nouvxDeplacmnt = 1;
    }
    if (bond < distance) {
        joueur.x = joueur.x + pas;
        bond = bond + pas;
    }
    if (space.isUp) {
        nouvxDeplacmnt = 0;
    }

    //groupe de dragons
    dragons.children.iterate(function (child) {
        if (joueur.x > child.x) {
            child.flipX = false;
        }
        else {
            child.flipX = true;
        }

        if (child.y > 520) {
            child.direction *= -1;
        }
        if (child.y < 80) {
            child.direction *= -1;
        }
        child.y += child.direction;
    });
}

function getTresor(joueur, tresor) {

    tresor.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

}
