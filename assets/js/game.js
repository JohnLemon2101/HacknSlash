// game.js

import { createPlayer } from './player.js';
import { createMonster } from './monster.js';

export function initializeGame() {
    var map = document.getElementById("game");
    
    // Récupérez la taille de la fenêtre
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    map.style.width = windowWidth + "px";
    map.style.height = windowHeight + "px";

    // Initialisation du jeu
    createPlayer();
    createMonster();

    // Gestion des événements clés (mouvement du joueur, tir, etc.)
    document.addEventListener('keydown', function (event) {
        // Gérer les événements clés du joueur (mouvement, tir, etc.)
    });

    // Boucle de jeu principale
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    // Mettre à jour la logique du jeu (mouvement, collisions, etc.)

    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
}
