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
        this.add.image(400, 300, 'background');
        joueur = this.physics.add.image(20, 300, 'player');
        joueur.setScale(0.7);
        this.add.image(725, 145, 'tresor').setScale(0.7);
        dragon = this.add.image(500, 120, 'dragon').setScale(0.7);
        dragon.flipX = true;



        joueur.setCollideWorldBounds(true);

        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update() {
        if (joueur.x > dragon.x) {
                dragon.flipX = false;
        }
         else {
        dragon.flipX = true;
        }

        if (space.isDown && move == 0 ) {
            joueur.x = joueur.x + 20;
            move = 1;
        }
        else if (space.isUp) {
            move = 0;
        };
}
