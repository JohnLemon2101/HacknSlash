import { startShooting } from "./projectile";

var speed = 5; // Vitesse de déplacement
var life = 2;
var damage = 1;

const playerWidth = 20;
const playerHeight = 50;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
var map = document.getElementById("game");

export function createPlayer() {
    const player = document.createElement("div");
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
}


    function handlePlayerMovement(event, player) {
        const playerRect = player.getBoundingClientRect();

        var targetX = playerRect.left; // Position cible en X
        var targetY = playerRect.top; // Position cible en Y

        if(event.key === "w" && targetY > 0) { targetY -= speed; }
        if(event.key === "s" && targetY < windowHeight - playerHeight) { targetY += speed; }
        if(event.key === "a" && targetX > 0) { targetX -= speed; }
        if(event.key === "d" && targetX < windowWidth - playerWidth) { targetX += speed; }


        player.style.top = targetY + "px";
        player.style.left = targetX + "px";
    }    
    
    
    document.addEventListener("keydown", function(event) 
    {
        handlePlayerMovement(event, player);
    });

    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
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