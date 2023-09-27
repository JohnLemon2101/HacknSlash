// game.js

import { windowHeight, windowWidth,  speedX, speedY } from './data.js';
import { createPlayer, } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters, startShooting } from './projectile.js';

var numMonsters = 20;
let player;
var map = document.getElementById("map");
var game = document.getElementById("game");
//var hp = document.getElementById("hp");

map.style.width = windowWidth + "px";
map.style.height = windowHeight + "px";

const keysPressed = {};

export function initializeGame() {
    // Initialisation du jeu

    player = createPlayer();

    spawnMonsters(numMonsters);

    document.addEventListener("keydown", handleKeyDown);
    
    document.addEventListener("keyup", handleKeyUp);

    game.addEventListener("mousedown", handleMouseClick);

    // Boucle de jeu principale
    requestAnimationFrame(gameLoop);
}

function handleKeyDown(event) {
    keysPressed[event.key] = true;
}

function handleKeyUp(event) {
    delete keysPressed[event.key];
}

function handleMouseClick(event) {
    startShooting(event.clientX, event.clientY, player);
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

function checkHP() {
    let hearts = document.querySelectorAll(".heart")
    hearts.forEach(heart => {
        if(player.dataset.life == heart.id.substring(5)){
            heart.src = "./assets/images/empty_heart.png";
        }
    });
    if(player.dataset.life == 0){
        endGame()
    }
}

function checkMonsterAlive() {
    let monsters = document.querySelectorAll(".monster")
    if (monsters.length === 0) {
        numMonsters++
        spawnMonsters(numMonsters)
    }
}

function spawnMonsters(nb) {
    for(let i = 0; i < nb; i++){
        createMonster(Math.floor(Math.random() * 4));
    }
}

function gameLoop() {
    
    // Mettre à jour la logique du jeu (mouvement, collisions, etc.)
    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
    checkHP();
    checkMonsterAlive()
    

 
    handlePlayerMovement();
    checkCollisionWithMonsters();

    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
}

function endGame() {
    // Supprimez les gestionnaires d'événements lorsque le jeu est terminé
    //map.removeEventListener("mousedown", handleMouseClick);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);

    setTimeout(function () {
        alert("Vous avez perdu :) vous avez survécu jusqu'à la vague " + (numMonsters - 3))
        location.reload();
    }, 500);
    
    // Autres actions de fin de jeu
}