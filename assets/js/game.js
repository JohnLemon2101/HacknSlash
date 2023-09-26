// game.js

import { createPlayer, damage, speedY, speedX } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters } from './projectile.js';

let numMonsters = 3;
let player;
var map;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const keysPressed = {};

export function initializeGame() {
    map = document.getElementById("game");
    
    // Récupérez la taille de la fenêtre

    map.style.width = windowWidth + "px";
    map.style.height = windowHeight + "px";

    // Initialisation du jeu
    player = createPlayer();
    for(let i = 0; i < numMonsters; i++){
        createMonster(Math.floor(Math.random() * 4));
    }

    // Boucle de jeu principale
    requestAnimationFrame(gameLoop);
}

function handlePlayerMovement() {
    const playerRect = player.getBoundingClientRect();

    let playerHeight = playerRect.height;
    let playerWidth = playerRect.width;
    var targetX = playerRect.left; // Position cible en X
    var targetY = playerRect.top; // Position cible en Y

    if(keysPressed["w"] && targetY > 0) { targetY -= speedY; }
    if(keysPressed["s"] && targetY < windowHeight - playerHeight) { targetY += speedY;  }
    if(keysPressed["a"] && targetX > 0) { targetX -= speedX;  }
    if(keysPressed["d"] && targetX < windowWidth - playerWidth) { targetX += speedX; }

    player.style.top = targetY + "px";
    player.style.left = targetX + "px";
}    



function gameLoop() {
    // Mettre à jour la logique du jeu (mouvement, collisions, etc.)
        // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
        

        document.addEventListener("keydown", function(event) {
            // Stocker l'état de la touche pressée dans l'objet keysPressed
            keysPressed[event.key] = true;
        });
        
        document.addEventListener("keyup", function(event) {
            // Supprimer la touche de l'objet keysPressed lorsque la touche est relâchée
            delete keysPressed[event.key];
        });

        handlePlayerMovement();
        checkCollisionWithMonsters();
    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
}
