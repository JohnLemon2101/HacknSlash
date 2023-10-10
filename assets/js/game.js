// game.js

import { windowHeight, windowWidth } from './data.js';
import { createPlayer, } from './player.js';
import { createMonster } from './monster.js';
import { checkCollisionWithMonsters, startShooting } from './projectile.js';
import { displayGameOver, displayUpgrade, createUpgradeDialog, createGameOverDialog, createEchapDialog, displayEscape } from './dialog.js';
import { Howl } from 'howler';

let bossSound
let backgroundSound;

//TODO bille multi color :)
//TODO ajout d'un boss tout les 10 vagues ?
//TODO upgrade damage/hp/speed of monster
//TODO add different type of audio so a onglet for that ?
//TODO add difficulty
//TODO finish dark theme
//TODO install phaser ?
//TODO ajouter un temps d'invincibilité quand on ce fait touché

let nbBoss = 1; //nombre de boss fait
let numMonstersAtStart = 3;
var numVague = 9;
let player;
var map = document.getElementById("map");
var game = document.getElementById("game");

let monsterLifeMax = 6;

map.style.width = windowWidth + "px";
map.style.height = windowHeight + "px";

var isEnded = 0;
let isUpdated = false;
let bossTime = false;

let keysPressed = {};

export function initializeGame() {
    // Initialisation du jeu
    game.dataset.theme = "light"
    game.dataset.volume = 0;
    
    bossSound = new Howl({
        src: ['assets/sounds/boss.mp3'],
        preload: true,
        volume: game.dataset.volume,
        loop: true,
    });

    backgroundSound = new Howl({
        src: ['assets/sounds/background.mp3'],
        preload: true,
        volume: game.dataset.volume,
        loop: true,
        autoplay: true
    });

    player = createPlayer();

    createGameOverDialog();

    createUpgradeDialog();

    createEchapDialog();

    const audioButton = document.getElementById("audioButton")

    audioButton.addEventListener("input", () => {
        bossSound.volume(audioButton.value / 100);
        backgroundSound.volume(audioButton.value / 100);
        game.dataset.volume = audioButton.value / 100;
    })

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

            //TODO bug au nivesu du déplacement vers le bas et la droite
            if((keysPressed["w"] || keysPressed["W"] || keysPressed["ArrowUp"]) && targetY > 30) { targetY -= player.dataset.speedY; }
            if((keysPressed["s"] || keysPressed["S"] || keysPressed["ArrowDown"]) && targetY < windowHeight - playerHeight-10) { targetY += player.dataset.speedY;  }
            if((keysPressed["a"] || keysPressed["A"] || keysPressed["ArrowLeft"]) && targetX > 10) { targetX -= player.dataset.speedX;  }
            if((keysPressed["d"] || keysPressed["D"] || keysPressed["ArrowRight"]) && targetX < windowWidth - playerWidth-10) { targetX += player.dataset.speedX; }

           

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
    if(isEnded == 0){
        if (monsters.length === 0) {
            if(document.getElementById("upgrade").style.display == "none"){
                let vagues = document.getElementById("vagues");
                vagues.textContent = "Vagues " + (numVague);              
            }

            if(numVague % 10 === 0){ 
                if(!isUpdated){
                    console.log("test")
                    backgroundSound.stop();
                    
                    bossSound.play();
                    spawnBoss();
                }
            }

            if((numVague - 1) % 5 === 0 && (numVague - 1) != 0){
                if(!isUpdated){
                    console.log(numVague)
                    displayUpgrade(numVague);
                    isUpdated = true;
                }
                if(bossTime){
                    bossSound.fade(game.dataset.volume, 0, 2000);
                    setTimeout(function () {
                        bossSound.stop()
                        backgroundSound.play();
                    }, 2000);
                    bossTime = false;
                }
            }

            if(document.getElementById("upgrade").style.display == "none" && numVague % 10 !== 0){
                isUpdated = false;
                spawnMonsters();                
            }

            if(!isUpdated){
                numVague++;
            }
        }
    }
}

function spawnMonsters() {
    numMonstersAtStart++;
    if(numVague % 2 === 0){
        monsterLifeMax++;
    }

    for(let i = 0; i < numMonstersAtStart; i++){
        let lifeMonster = (Math.floor(Math.random() * (monsterLifeMax)));
        createMonster(lifeMonster, 2, 1, nbBoss);
    }
    
}

function spawnBoss() {
    bossTime = true;
    monsterLifeMax = 6;
    numMonstersAtStart = 5;
    nbBoss++;
    createMonster(numVague, 4, 1);  
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

    
    
    requestAnimationFrame(gameLoop);
    
}

