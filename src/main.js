/*
*
* Name: Nhan Nguyen
* Game Title: The Bird Ups
* Approximate Number of Hours: 20
* Creative Tilt: 
* - On the technical side, something technically cool I made is the mechanic where you will lose if you stand on the ground for way too long.
*   The mechanic uses a clock mechanic to count how many seconds the player has been on the ground while resetting the clock immediately when the player left the ground
* - On top of that, the mechanic to destroy every bird on the screen is something that I'm proud of. This mechanic utilizes the randomizer to gift the player when they shot
*   a certain number of birds, while also utilize the ability to destroy multiple sprites at once
* - On the creative side, I was surprised at myself when I was able to make a good looking bird sprite from the inspirations I had from the game Flappy Bird. I used
*   an online software to create bits of the character, and making sure that the sprites stays at an appropriate size so it doesn't interfere with the player too much
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [Menu, Tutorial, Play, Credits]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyN, keyLEFT, keyRIGHT;
let currentX, currentY;
let gamespeed = 2;
