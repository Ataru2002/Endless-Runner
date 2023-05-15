class Enemies extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = gamespeed;
    }
    update(){
        this.moveSpeed = gamespeed;
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }
    reset(){
        this.x = game.config.width;
    }
}
