class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }

    preload(){

    }
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFF00',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'credits').setScale(1);
        
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //Play
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
        }
    }
}