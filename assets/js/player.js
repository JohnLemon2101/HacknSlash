import { startShooting } from "./projectile";
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const playerWidth = 20;
const playerHeight = 50;

export var speedY = 5; // Vitesse de déplacement
export var speedX = (speedY * windowWidth) / playerWidth;
var life = 1;
export var damage = 1;

var map = document.getElementById("game");

export function createPlayer() {
    const player = document.createElement("div");
    player.dataset.life = life;
    const imagePlayer = document.createElement("img");
    player.id = "player";
    imagePlayer.src = "./assets/images/img.png";
    document.getElementById("game").appendChild(player);
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
    
    
map.addEventListener("mousedown", function(event) {
    startShooting(event.clientX, event.clientY, player, damage);
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