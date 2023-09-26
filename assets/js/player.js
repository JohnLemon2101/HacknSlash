import { startShooting } from "./projectile";
import { windowHeight, windowWidth, playerHeight, playerWidth} from './data.js';

var map = document.getElementById("map");

export var life = 1;
var damage = 1;

export function createPlayer() {
    const player = document.createElement("div");
    player.dataset.life = life;
    player.dataset.damage = damage;
    player.id = "player";

    const imagePlayer = document.createElement("img");
    imagePlayer.src = "./assets/images/img.png";

    map.appendChild(player);
    player.appendChild(imagePlayer);

    // Définir la taille et la position initiale du joueur
    player.style.width = playerWidth + "px";
    player.style.height = playerHeight + "px";

    // Position initiale du joueur (au centre de la fenêtre)

    const initialX = (windowWidth - playerWidth) / 2;
    const initialY = (windowHeight - playerHeight) / 2;

    player.style.left = initialX + "px";
    player.style.top = initialY + "px";
    return player;
} 
    
    /*
map.addEventListener("mousedown", function(event) {
    console.log("test")
    startShooting(event.clientX, event.clientY, player);
});
*/
/*
var verification = setInterval(function(){
    var persoHitboxTop = parseInt(window.getComputedStyle(persoHitbox).getPropertyValue("top"))
    var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"))
    if(obstaclesLeft<20 && obstaclesLeft>0 && persoHitboxTop>=130){
        obstacles.style.animation = "none";
        //alert("Looser")
    }
},1)*/