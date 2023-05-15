class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.atlas("bird", "./assets/runner.png", "./assets/runner_atlas.json");
        this.load.image("ground", "./assets/Ground.png");
        this.load.image("intro", "./assets/Intro.png");
        this.load.image("tutorial", "./assets/Tutorial.png");
        this.load.image("credits", "./assets/Credits.png");
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_shoot', './assets/shoot.mp3');
        this.load.audio('sfx_nuke', './assets/nuke.wav');
    }
    create(){
        this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'intro');
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
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //Tutorials
            this.sound.play('sfx_select');
            this.scene.start('creditsScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //Tutorials
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene');
        }
    }
}