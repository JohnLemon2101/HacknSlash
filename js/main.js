var perso = document.querySelector(".perso");
var obstacles = document.querySelector(".obstacles");

document.addEventListener("keydown", function(event) {
    if(event.key === " "){
        console.log("jump");
        sauter();
    }
})

function sauter(){
    if(perso.classList != "animation"){
        perso.classList.add("animation");
    }
    setTimeout(function(){
        perso.classList.remove("animation");
    }, 500)
}

var verification = setInterval(function(){
    var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"))
    var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"))
    if(obstaclesLeft<20 && obstaclesLeft>0 && persoTop>=130){
        obstacles.style.animation = "none";
        alert("Looser")
    }
},1)