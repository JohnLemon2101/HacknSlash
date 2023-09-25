import { startShooting } from "./projectile";

document.addEventListener("DOMContentLoaded", function() {
    var persoHitbox = document.getElementById("perso");
    var map = document.getElementById("game");

    const playerHeight = 50;
    const playerWidth = 20;
    var speed = 5; // Vitesse de déplacement

    // Récupérez la taille de la fenêtre
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const limitMin = 0;

    var positionX = windowWidth / 2; // Position initiale de l'image en X
    var positionY = windowHeight / 2; // Position initiale de l'image en Y
    
    var targetX = positionX; // Position cible en X
    var targetY = positionY; // Position cible en Y

    persoHitbox.style.top = positionY + "px";
    persoHitbox.style.left = positionX + "px";

    persoHitbox.style.width = playerWidth + "px";
    persoHitbox.style.height = playerHeight + "px";

    map.style.width = windowWidth + "px";
    map.style.height = windowHeight + "px";

    function movePlayer() {
        var playerHitbox = persoHitbox.getBoundingClientRect();
        
        if (
            playerHitbox.left > limitMin &&
            playerHitbox.top > limitMin &&
            playerHitbox.right < windowWidth &&
            playerHitbox.bottom < windowHeight 
        ) {
            const stepX = (targetX - positionX);
            const stepY = (targetY - positionY);
            positionX += stepX;
            positionY += stepY;

            persoHitbox.style.top = positionY + "px";
            persoHitbox.style.left = positionX + "px";


        
            requestAnimationFrame(movePlayer);
        }
        
    }    
    
    document.addEventListener("keydown", function(event) 
    {
        if(event.key === "w") { targetY = positionY - speed; }
        if(event.key === "a") { targetX = positionX - speed; }
        if(event.key === "s") { targetY = positionY + speed; }
        if(event.key === "d") { targetX = positionX + speed; }

        requestAnimationFrame(movePlayer);
    });

    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
    map.addEventListener("mousedown", function(event) {
        startShooting(event.clientX, event.clientY);
    });
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