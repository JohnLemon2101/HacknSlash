import { initializeGame } from './game.js';
import { Howl } from 'howler';

new Howl({
    src: ['assets/sounds/boss.mp3'],
    preload: true,
    volume: 0.1,
    loop: true,
    autoplay: false //turn true to play music
  });

document.addEventListener('DOMContentLoaded', function () {
    
    initializeGame();
});