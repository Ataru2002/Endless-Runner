class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.audio('background', './assets/Fluffing-a-Duck.mp3')
        this.load.image("enemy", "./assets/enemies.png")
        this.load.image("bullet", "./assets/Bullet.png")
        this.load.image("skies", "./assets/Skies.jpg")
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNames("bird", {
                prefix: "bird_",
                start: 0,
                end: 7,
            }),
            repeat: -1
        })
    }
    create(){   
        this.backgroundSound = this.sound.add('background');
        this.backgroundSound.setLoop(true);
        this.backgroundSound.play();

        this.skies = this.add.tileSprite(0, 0, 640, 480, 'skies').setOrigin(0, 0);
        this.skies.setInteractive();
        this.gameOver = 0;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(100, 200, 'bird').setScale(1.5);
        this.player.flipX = true;
        //this.enemy1 = this.physics.add.sprite(300, 200, 'enemy');
        
        

        this.enemy1 = new Enemies(this, game.config.width + borderUISize*6, borderUISize*4, 'enemy', 0, 20).setScale(0.5);
        this.enemy2 = new Enemies(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'enemy', 0, 10).setScale(0.5);
        //this.enemy1 = new Enemies(this, 300, 200, 'enemy', 0, 30).setOrigin(0, 0);
        this.bullet = new Bullet(this, game.config.width/2, 390, 'bullet', 0).setScale(0.5);

        this.ground1 = this.physics.add.image(game.config.width/2, 390, 'ground').setScale(1.25);
        this.ground = this.add.tileSprite(game.config.width/2, 390, 640, 0, 'ground').setScale(1.25);
        this.ground1.setImmovable(true);
        this.ground1.body.allowGravity = false;
        
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground1);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        this.timer = 0;
        this.curscore = 0;
        this.timeprev = 0;
        this.nuke = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 200
        }
        this.scoreLeft1 = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Score:' + this.curscore, scoreConfig);
        scoreConfig.fixedWidth = 140;
        this.nukeLabel = this.add.text(borderUISize + borderPadding + 450, borderUISize + borderPadding*2, 'Nukes: ' + this.nuke, scoreConfig);



        this.startTimer(1000000000);
    }
    update(){
        this.scoreLeft1.text = 'Score: ' + this.curscore;
        this.nukeLabel.text = 'Nukes: ' + this.nuke;
        const elapsed = this.timerEvent.getElapsed()
        this.player.anims.play('right', true);

        if((((elapsed / 1000).toFixed(0)) % 10) == 0 && ((elapsed / 1000).toFixed(0)) - this.timeprev == 10){
            gamespeed++;
            this.timeprev = ((elapsed / 1000).toFixed(0));
        }
        if(this.player.body.touching.down) this.timer++;
        else this.timer = 0;
        if(this.timer >= 600) this.gameOver = 1;
        if(!this.gameOver){
            this.enemy1.update();
            this.enemy2.update();
            this.bullet.update();
            this.ground.tilePositionX += 4;
            this.skies.tilePositionX += 4;
            currentX = this.player.x;
            currentY = this.player.y;
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-180);

            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(180);
            }
            else
            {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown && this.player.body.touching.down) //if key up is press and the character is on the ground
            {
                this.player.setVelocityY(-360);
            }
        }
        if (this.nuke > 0 && Phaser.Input.Keyboard.JustDown(keyN)) {
            //highscore = Math.max(this.p1Score)
            this.destructor(this.bullet, this.enemy1);
            this.destructor(this.bullet, this.enemy2);
            this.nuke--;
            this.sound.play('sfx_nuke');
            this.curscore += this.enemy1.points;
            this.curscore += this.enemy2.points;
        }
        if(this.gameOver){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.sound.play('sfx_select');
            this.backgroundSound.stop();
            this.player.setActive(true);
            this.gameOver = false;
        }
        if (this.gameOver && this.cursors.left.isDown) {
            this.scene.start("menuScene");
            this.sound.play('sfx_select');
            this.backgroundSound.stop();
            this.player.setActive(true);
            this.gameOver = false;
        }
        
        if(this.checkCollision(this.player, this.enemy1)){
            this.gameOver = 1;
            this.player.setActive(false);
            gamespeed = 2;
        }
        if(this.checkCollision(this.player, this.enemy2)){
            this.gameOver = 1;
            this.player.setActive(false);
            gamespeed = 2;
        }
        if(this.checkCollision(this.bullet, this.enemy1)){
            this.destructor(this.bullet, this.enemy1);
            this.curscore += this.enemy1.points;
        }
        if(this.checkCollision(this.bullet, this.enemy2)){
            this.destructor(this.bullet, this.enemy2);
            this.curscore += this.enemy2.points;
        }
    }
    checkCollision(object1, object2) {
        // simple AABB checking
        if (object1.x < object2.x + object2.width && 
            object1.x + object1.width > object2.x && 
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y) {
            return true;
        } else {
            return false;
        }
    }
    destructor(bullet, enemy) {
        enemy.reset();
        bullet.reset();
        this.curscore += this.enemy1.points;
        let determine = Math.floor(Math.random() * 5);
        if(determine == 1) this.nuke++;
        // console.log(determine);
        // if(determine == 0) this.sound.play('sfx_explosion');
        // if(determine == 1) this.sound.play('sfx_explosion1');
        // if(determine == 2) this.sound.play('sfx_explosion2');
        // if(determine == 3) this.sound.play('sfx_explosion3');
        // if(determine == 4) this.sound.play('sfx_explosion4');
    }
    startTimer(duration = 1000000000){
        this.timerEvent = this.time.addEvent({
            delay: duration
        })
    }
}