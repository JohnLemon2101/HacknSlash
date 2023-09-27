import { startShooting } from "./projectile";
import { windowHeight, windowWidth, playerHeight, playerWidth} from './data.js';

var map = document.getElementById("map");
var game = document.getElementById("game");

export var life = 3;
var damage = 1;

export function createPlayer() {
    const player = document.createElement("div");
    player.dataset.life = life;
    player.dataset.maxLife = life;
    player.dataset.damage = damage;
    player.id = "player";


    const hp = document.createElement("div");
    hp.id = "hp"

    hp.style.width = 20 * player.dataset.life + "px";

    for(let i = 0; i < player.dataset.life; i++){
        
        const imageHeart = document.createElement("img");
        imageHeart.src = "./assets/images/full_heart.png";
        imageHeart.className = "heart";
        imageHeart.id = "heart" + i;
        hp.appendChild(imageHeart);
    }
    
    const imagePlayer = document.createElement("img");
    imagePlayer.src = "./assets/images/img.png";

    map.appendChild(player);

    
    map.appendChild(hp);
    

    // Définir la taille et la position initiale du joueur
    player.style.width = playerWidth + "px";
    player.style.height = playerHeight + "px";
    imagePlayer.style.width = playerWidth + "px";
    imagePlayer.style.height = playerHeight + "px";

    player.appendChild(imagePlayer);

    // Position initiale du joueur (au centre de la fenêtre)

    const initialX = (windowWidth - playerWidth) / 2;
    const initialY = (windowHeight - playerHeight) / 2;

    player.style.left = initialX + "px";
    player.style.top = initialY + "px";
    return player;
} 
    
game.addEventListener("mousedown", function(event) {
    startShooting(event.clientX, event.clientY, player);
});
/*
var verification = setInterval(function(){
    var persoHitboxTop = parseInt(window.getComputedStyle(persoHitbox).getPropertyValue("top"))
    var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"))
    if(obstaclesLeft<20 && obstaclesLeft>0 && persoHitboxTop>=130){
        obstacles.style.animation = "none";
        //alert("Looser")
    }
},1)*/