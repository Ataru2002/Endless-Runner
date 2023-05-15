class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setActive(false);
        this.setVisible(false);
        this.isFiring = false;
        this.moveSpeed = gamespeed;
        this.sfxShoot = scene.sound.add('sfx_shoot');
    }

    update(){
        //not firing
        if(!this.isFiring){
            this.x = game.config.width/2;
            this.y = 390;
        }
        //start firing
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.x = currentX;
            this.y = currentY;
            this.setActive(true);
            this.setVisible(true);
            this.sfxShoot.play();  // play sfx
        }
        //fired = move left
        if(this.isFiring && this.x < game.config.width){
            this.x += this.moveSpeed
        }
        //reset on miss
        if(this.x >= game.config.width){ 
            this.reset();
        }
    }
    reset(){
        this.isFiring = false;
        this.setActive(false);
        this.setVisible(false);
        this.x = game.config.width/2;
        this.y = 390;
    }
  }