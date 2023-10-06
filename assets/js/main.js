import { playerHeight, playerWidth, windowHeight, windowWidth } from './data.js';
import { initializeGame } from './game.js';
import Phaser from 'phaser';
import { createPlayer } from './player.js';

// Fonction de préchargement des ressources
function preload() {
    this.load.image('player_dark', 'assets/images/player_dark.png');
    this.load.image('player_light', 'assets/images/player_light.png');
    this.load.spritesheet('player_dark', 
        'assets/images/player_dark.png',
        { frameWidth: playerWidth, frameHeight: playerHeight }
    );
    this.load.spritesheet('player_light', 
        'assets/images/player_light.png',
        { frameWidth: playerWidth, frameHeight: playerHeight }
    );
}

// Fonction de création du jeu
function create() {
    this.add.sprite(400, 300, 'player_dark');
    createPlayer();
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
