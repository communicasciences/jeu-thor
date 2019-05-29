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
    this.load.image('background', 'assets/background.png');
    this.load.image('tresor', 'assets/treasure.png');

}

function create ()
{
    this.add.image(400, 300, 'background');
    this.add.image(720, 150, 'tresor');
}

function update ()
{

}
