// game.js

import { windowHeight, windowWidth,  speedX, speedY } from './data.js';
import { createPlayer, } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters, startShooting } from './projectile.js';
import { displayGameOver } from './dialog.js';

var numMonsters = 20;
let player;
var map = document.getElementById("map");
var game = document.getElementById("game");
//var hp = document.getElementById("hp");

map.style.width = windowWidth + "px";
map.style.height = windowHeight + "px";

var isEnded = 0;
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
    for(let i = 0; i < player.dataset.initialLife; i++){
        let heart = document.getElementById("heart" + i);
        if(i + 1 <= player.dataset.life){
            heart.src = "./assets/images/full_heart.png";
        } else {
            heart.src = "./assets/images/empty_heart.png";
        }
        
    }

    if(player.dataset.life <= 0){
        isEnded++;
        endGame()
    }
}

function checkMonsterAlive() {
    let monsters = document.querySelectorAll(".monster")
    if (monsters.length === 0) {
        numMonsters++
        //spawnMonsters(numMonsters)
    }
}

function spawnMonsters(nb) {
    for(let i = 0; i < nb; i++){
        createMonster(Math.floor(Math.random() * 4));
    }
}

function endGame() {
    // Supprimez les gestionnaires d'événements lorsque le jeu est terminé
    game.removeEventListener("mousedown", handleMouseClick);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);

    const monsters = document.querySelectorAll(".monster");

    monsters.forEach((monster) => {
        monster.remove();
    });

    displayGameOver("gameOver", (numMonsters - 3));
    
    /*setTimeout(function () {
        //alert("Vous avez perdu :) vous avez survécu jusqu'à la vague " + (numMonsters - 3))
        
    }, 100);*/
    
    // Autres actions de fin de jeu
}

function gameLoop() {
    if(isEnded == 0){
    // Mettre à jour la logique du jeu (mouvement, collisions, etc.)
    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
    checkHP();
    checkMonsterAlive()

    handlePlayerMovement();
    checkCollisionWithMonsters();

    // Appeler la boucle de jeu à la prochaine frame
    requestAnimationFrame(gameLoop);
    }
}

