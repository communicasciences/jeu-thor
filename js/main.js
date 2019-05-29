var scene = new Phaser.Scene ("jeu");

var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    scene: {
        preload : preload,
        create : create,
        update: update,
    },
    scale:{
        autoCenter:Phaser.Scale.Center.CENTER_BOTH,
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    
    this.load.image('player', 'assets/player.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('tresor', 'assets/treasure.png');
    this.load.image('dragon', 'assets/dragon.png');
}

function create ()
{
    this.add.image(400, 300, 'background');
    var joueur = this.add.image(20, 300, 'player');
    joueur.setScale (0.7);
    this.add.image(725, 145, 'tresor').setScale(0.7);
    this.add.image(500, 120, 'dragon').setScale(0.7);
}

function update ()
{

}
