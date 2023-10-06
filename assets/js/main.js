import { playerHeight, playerWidth, windowHeight, windowWidth } from './data.js';
import { initializeGame } from './game.js';
import Phaser from 'phaser';
import { createPlayer } from './player.js';
import { Howl } from 'howler';

new Howl({
    src: ['assets/sounds/boss.mp3'],
    preload: true,
    volume: 0.1,
    loop: true,
    autoplay: false //turn true to play music
  });

document.addEventListener('DOMContentLoaded', function () {
    
   // initializeGame();
});

// Fonction de préchargement des ressources
function preload() {
    //this.load.image('player_dark', 'assets/images/player_dark.png');
    //this.load.image('player_light', 'assets/images/player_light.png');

    this.load.spritesheet('dude', 
        'assets/images/dude.png',
        { frameWidth: playerWidth, frameHeight: playerHeight }
    );

    this.load.spritesheet('player_dark', 
        'assets/images/player_dark.png',
        { frameWidth: playerWidth, frameHeight: playerHeight }
    );
    this.load.spritesheet('player_light', 
        'assets/images/player_light.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

// Fonction de création du jeu
function create() {
    // Créez un élément graphique pour le fond du canvas
    const background = this.add.graphics();

    // Définissez la couleur de remplissage du fond (par exemple, rouge)
    background.fillStyle(0xffffff); // Remplacez 0xff0000 par le code couleur de votre choix

    // Remplissez le rectangle du fond avec la couleur définie
    background.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Assurez-vous que le fond est en arrière-plan
    background.setDepth(-1);

    player = this.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //this.add.sprite(400, 300, 'player_dark');

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    //createPlayer();
}

// Fonction de mise à jour du jeu
function update() {
  // Logique de mise à jour du jeu
  //initializeGame();
}

// Configuration du jeu
const config = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// Création de l'instance de jeu
const game = new Phaser.Game(config);

// Démarrez le jeu en utilisant une scène (remplacez 'VotreScene' par le nom de votre scène)
game.scene.start('VotreScene');

