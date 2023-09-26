// game.js

import { windowHeight, windowWidth,  speedX, speedY } from './data.js';
import { createPlayer, } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters, startShooting } from './projectile.js';

let numMonsters = 3;
let player;
var map = document.getElementById("map");
var game = document.getElementById("game");
//var hp = document.getElementById("hp");

map.style.width = windowWidth + "px";
map.style.height = windowHeight + "px";

const keysPressed = {};

export function initializeGame() {
    // Initialisation du jeu

    //TODO mettre les pv dans le div du player
    player = createPlayer();
    /*hp.style.width = 20 * player.dataset.life + "px";
    d.log(player.dataset.life)
    for(let i = 0; i < player.dataset.life; i++){
        
        const imageHeart = document.createElement("img");
        imageHeart.src = "./assets/images/full_heart.png";
        imageHeart.className = "heart";
        imageHeart.id = "heart" + i;
        hp.appendChild(imageHeart);
    }*/

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
        
        game.addEventListener("mousedown", function(event) {
            startShooting(event.clientX, event.clientY, player);
        });

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

        //TODO faire une check du nombre de monstre en vie si plus aucun refaire une vague avec 1 de plus
    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
}
