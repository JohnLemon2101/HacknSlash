
var damage = 1;
var monsterLife;
const monsterSpeed = 2;
const monsterHeight = 50;
const monsterWidth = 50;

const map = document.getElementById("game");

// Positionnez le monstre aléatoirement sur la carte de jeu
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export function createMonster(life) {
    console.log(life)
    if(life == 0){
        monsterLife = 1;
    }else{
        monsterLife = life;
    }
    // Créez un élément div pour représenter le monstre
    const monster = document.createElement("div");
    monster.className = "monster"; // Appliquez des styles CSS pour le monstre
    monster.style.height = monsterHeight + "px";
    monster.style.width = monsterWidth + "px";
    monster.dataset.life = monsterLife;
    monster.dataset.damage = damage;

    // Générez une position aléatoire sur le côté de la carte
    const side = Math.floor(Math.random() * 4); // 0: haut, 1: droite, 2: bas, 3: gauche
    let monsterX, monsterY;
    
    switch (side) {
        case 0: // Haut
            monsterX = Math.random() * (windowWidth - 50);
            monsterY = 0;
            break;
        case 1: // Droite
            monsterX = windowWidth - 50;
            monsterY = Math.random() * (windowHeight - 50);
            break;
        case 2: // Bas
            monsterX = Math.random() * (windowWidth - 50);
            monsterY = windowHeight - 50;
            break;
        case 3: // Gauche
            monsterX = 0;
            monsterY = Math.random() * (windowHeight - 50);
            break;
    }

    
    // Appliquez la position initiale du monstre
    monster.style.left = monsterX + "px";
    monster.style.top = monsterY + "px";

    map.appendChild(monster);

    function moveMonster() {
        var player = document.getElementById("player")
        const playerRect = player.getBoundingClientRect();
        const monsterRect = monster.getBoundingClientRect();

        const deltaX = playerRect.left - monsterRect.left;
        const deltaY = playerRect.top - monsterRect.top;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const moveX = (deltaX / distance) * monsterSpeed;
        const moveY = (deltaY / distance) * monsterSpeed;

        // Mettez à jour la position du monstre
        monsterX += moveX;
        monsterY += moveY;

        monster.style.left = monsterX + "px";
        monster.style.top = monsterY + "px";

        requestAnimationFrame(moveMonster);

        // Vérifiez si le monstre a atteint le joueur
        if (
            playerRect.left < monsterRect.right &&
            playerRect.top < monsterRect.bottom &&
            playerRect.right > monsterRect.left &&
            playerRect.bottom > monsterRect.top 
        ) {
            // Le monstre a atteint le joueur, vous pouvez ajouter votre logique de jeu ici (par exemple, réduire la santé du joueur)
            player.dataset.life = player.dataset.life - monster.dataset.damage
            if(player.dataset.life == 0){
                alert("Vous avez perdu :)")
            }
            monster.remove(); // Supprimez le monstre
        }
    }

    // Démarrez le mouvement du monstre
    requestAnimationFrame(moveMonster);






}
/*
document.addEventListener("DOMContentLoaded", function() {
    const monster = document.querySelector(".monster");

    // Fonction pour déplacer le monstre aléatoirement
    function moveMonster() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const maxX = windowWidth - monster.clientWidth;
        const maxY = windowHeight - monster.clientHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        monster.style.left = randomX + "px";
        monster.style.top = randomY + "px";
    }

    // Déplacer le monstre lorsque la page est chargée
    moveMonster();

    // Déplacer le monstre à chaque clic de souris
    monster.addEventListener("click", moveMonster);
});

*/


