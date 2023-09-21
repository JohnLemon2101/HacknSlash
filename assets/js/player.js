document.addEventListener("DOMContentLoaded", function() {

    var persoHitbox = document.getElementById("perso");
    var obstacles = document.getElementById("obstacles");
    var persoImage = persoHitbox.querySelector("img");
    var map = document.getElementById("game");

    var speed = 5; // Vitesse de déplacement
    const squareSize = 500;

    let positionX = squareSize / 2; // Position initiale de l'image en X
    let positionY = squareSize / 2; // Position initiale de l'image en Y
    let targetX = positionX; // Position cible en X
    let targetY = positionY; // Position cible en Y

    let limitMax = 450;
    let limitMin = 0;

    const keysPressed = {};

    persoImage.style.width = "20px";
    persoImage.style.height = "50px";

    persoHitbox.style.top = positionX + "px";
    persoHitbox.style.left = positionY + "px";

    map.style.width = squareSize + "px";
    map.style.height = squareSize + "px";



    function movePlayer() {
        const stepX = (targetX - positionX);
        const stepY = (targetY - positionY);
        positionX += stepX;
        positionY += stepY;

        console.log(positionX)
        persoHitbox.style.left = positionX + "px";
        persoHitbox.style.top = positionY + "px";

        if (Math.abs(targetX - positionX) > 1 || Math.abs(targetY - positionY) > 1) {
            requestAnimationFrame(movePlayer);
        }
    }    
    
    document.addEventListener("keydown", function(event) {
        if(event.key === "w" && targetY>limitMin) { targetY = positionY - speed; }
        if(event.key === "a" && targetX>limitMin) { targetX = positionX - speed; }
        if(event.key === "s" && targetY<limitMax) { targetY = positionY + speed; }
        if(event.key === "d" && targetX<limitMax+25) { targetX = positionX + speed; }

        console.log(targetY)
        requestAnimationFrame(movePlayer);
        }
    )


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