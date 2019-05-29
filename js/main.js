var scene = new Phaser.Scene ("jeu");

var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    scene : {
            preload : preload,
            create : create,
            update : update,
                    
            
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    
        this.load.image('player', 'assets/player.png');
        


}

function create ()
{
        var joueur = this.add.image(20, 300, 'player');
        joueur.setScale (0.7);

        
}

function update ()
{

}
