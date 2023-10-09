// game.js

import { windowHeight, windowWidth,  speedX, speedY } from './data.js';
import { createPlayer, } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters, startShooting } from './projectile.js';
import { displayGameOver, displayUpgrade, createUpgradeDialog, createGameOverDialog, createEchapDialog, displayEscape } from './dialog.js';
import { Howl } from 'howler';

let bossSound = new Howl({
    src: ['assets/sounds/boss.mp3'],
    preload: true,
    volume: 0.5,
    loop: true,
    id: 'bossSound'
  });
//TODO bille multi color :)
//TODO ajout d'un boss tout les 10 vagues ?
//TODO upgrade damage/hp/speed of monster
//TODO add different type of audio so a onglet for that ?
//TODO add difficulty
//TODO finish dark theme
//TODO install phaser ?

let nbBoss = 1;
let numMonstersAtStart = 3;
var numVague = 1;
let player;
var map = document.getElementById("map");
var game = document.getElementById("game");

let monsterLifeMax = 6;

map.style.width = windowWidth + "px";
map.style.height = windowHeight + "px";

var isEnded = 0;
let isUpdated = false;

let keysPressed = {};

export function initializeGame() {
    // Initialisation du jeu
    game.dataset.theme = "light"
        
    /*
    const gamepads = navigator.getGamepads(); // Obtenir la liste des manettes connectées

    console.log(gamepads)
    for (const gamepad of gamepads) {
      console.log(gamepad)
    }*/
  


    player = createPlayer();

    createGameOverDialog();

    createUpgradeDialog();

    createEchapDialog();

    const audioButton = document.getElementById("audioButton")

    spawnMonsters();

    document.addEventListener("keydown", handleKeyDown);
    
    document.addEventListener("keyup", handleKeyUp);

    game.addEventListener("mousedown", handleMouseClick);

    // Boucle de jeu principale
    requestAnimationFrame(gameLoop);
}

function handleKeyDown(event) {
    keysPressed[event.key] = true;
    if(event.key === "Escape"){
        togglePauseGame();
    }
}

function togglePauseGame() {
    player.dataset.isGamePaused = !JSON.parse(player.dataset.isGamePaused); // Inversez l'état de la pause
    displayEscape(JSON.parse(player.dataset.isGamePaused));
}


function handleKeyUp(event) {
    delete keysPressed[event.key];
}

function handleMouseClick(event) {
    startShooting(event.clientX, event.clientY, player);
}

function handlePlayerMovement() {
    if(!JSON.parse(player.dataset.isGamePaused)) {
        if(isEnded == 0){
            const playerRect = player.getBoundingClientRect();

            let playerHeight = playerRect.height;
            let playerWidth = playerRect.width;

            var targetX = playerRect.left; // Position cible en X
            var targetY = playerRect.top; // Position cible en Y

            if((keysPressed["w"] || keysPressed["W"] || keysPressed["ArrowUp"]) && targetY > 10) { targetY -= speedY; }
            if((keysPressed["s"] || keysPressed["S"] || keysPressed["ArrowDown"]) && targetY < windowHeight - playerHeight-10) { targetY += speedY;  }
            if((keysPressed["a"] || keysPressed["A"] || keysPressed["ArrowLeft"]) && targetX > 10) { targetX -= speedX;  }
            if((keysPressed["d"] || keysPressed["D"] || keysPressed["ArrowRight"]) && targetX < windowWidth - playerWidth-10) { targetX += speedX; }

            player.style.top = targetY + "px";
            player.style.left = targetX + "px";
        }
    }
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
    if (monsters.length === 0 && isEnded == 0) {
        if((numVague) % 5 === 0){
            if(!isUpdated){
                displayUpgrade(numVague);
            }
            isUpdated = true;
            if(document.getElementById("upgrade").style.display == "none"){
                isUpdated = false;
                numVague++;
                bossSound.fade(0.1, 0, 2000);
                spawnMonsters();                
            }
        } else if((numVague) % 10 === 0){ 
            spawnMonsters();  
        }else {
            
            if(!isUpdated){
                numVague++;
                spawnMonsters();   
            }         
        }
    }
}

function spawnMonsters() {
    numMonstersAtStart++;
    if(numVague % 2 === 0){
        monsterLifeMax++;
    }
    let vagues = document.getElementById("vagues");
    vagues.textContent = "Vagues " + (numVague);
    if(numVague % 10 === 0){ 
        bossSound.play();
        monsterLifeMax = 6;
        numMonstersAtStart = 5;
        nbBoss++;
        createMonster(numVague);  
    } else {
        for(let i = 0; i < numMonstersAtStart; i++){
            let lifeMonster = (Math.floor(Math.random() * (monsterLifeMax)));
            createMonster(lifeMonster, nbBoss);
        }
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

    displayGameOver("votre score est de ", " vague(s)", numVague);
}

function gameLoop() {
    game.addEventListener('mouseleave', () => {
        player.dataset.isGamePaused = true; // Inversez l'état de la pause
        displayEscape(JSON.parse(player.dataset.isGamePaused));
      });
      
    if(!JSON.parse(player.dataset.isGamePaused)) {
        if(isEnded == 0){
            // Mettre à jour la logique du jeu (mouvement, collisions, etc.)
            // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
        
            checkHP();
            checkMonsterAlive()
        
            handlePlayerMovement();
            checkCollisionWithMonsters();
        
            // Appeler la boucle de jeu à la prochaine frame
        }
    }

    audioButton.addEventListener("input", () => {
        bossSound.volume(audioButton.value / 100);
    })
    
    requestAnimationFrame(gameLoop);
    
}

