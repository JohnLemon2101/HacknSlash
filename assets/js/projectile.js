const player = "";
const map = document.getElementById("game");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const limitMin = 0;

var projectileX = 0;
var projectileY = 0;

var speed = 20;
var damage = 0;

let isShooting = false; // Variable pour suivre si le projectile est en cours de tir

// Variables pour stocker les coordonnées du point de clic
var targetX = 0;
var targetY = 0;

export function startShooting(x, y, player, damagePlayer) {
    damage = damagePlayer;
    player = player;
    
    let playerHitbox = player.getBoundingClientRect();

    const projectile = document.createElement("div");
    projectile.className = "projectile"; // Appliquez des styles CSS pour le projectile
    map.appendChild(projectile);

    projectileX = playerHitbox.left; // Position X initiale du projectile
    projectileY = playerHitbox.top + playerHitbox.height / 2; // Position Y initiale du projectile

    projectile.style.left = projectileX + "px";
    projectile.style.top = projectileY + "px";
            
    targetX = x;
    targetY = y;     

    isShooting = true;
    moveProjectile(projectileX, projectileY, targetX, targetY, projectile)
    
}

function moveProjectile(projectileX, projectileY, targetX, targetY, projectile) {
    if (isShooting) {
            
        let deltaX = targetX - projectileX;
        let deltaY = targetY - projectileY;
    
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
        let moveX = (deltaX / distance) * speed;
        let moveY = (deltaY / distance) * speed;
    
        // Fonction pour mettre à jour la position de la balle jusqu'à la cible
        function updatePosition() {
            var projHitBox = projectile.getBoundingClientRect();

            if (
                projHitBox.left > limitMin &&
                projHitBox.top > limitMin &&
                projHitBox.right < windowWidth &&
                projHitBox.bottom < windowHeight 
            ) {
                // Vérifiez la collision avec les monstres
                if (checkCollisionWithMonsters(projHitBox)) {
                    // Collision détectée, supprimez le projectile
                    stopShooting(projectile);
                } else {
                    projectileX += moveX;
                    projectileY += moveY;

                    projectile.style.left = projectileX + "px";
                    projectile.style.top = projectileY + "px";

                    requestAnimationFrame(updatePosition); // Demander une nouvelle frame pour la mise à jour continue
                }
            }else{
                stopShooting(projectile);
            }
        }
        // Lancer la mise à jour de la position
        updatePosition();
    }
}

function stopShooting(projectile) {
    isShooting = false;
    map.removeChild(projectile);
}

// Détection de collision entre projectiles et monstres
export function checkCollisionWithMonsters (projectileRect) {
    const monsters = document.querySelectorAll(".monster");

    monsters.forEach((monster) => {
        const monsterRect = monster.getBoundingClientRect();

        // Vérifiez si les rectangles de collision se chevauchent
        if (
            projectileRect.right > monsterRect.left &&
            projectileRect.left < monsterRect.right &&
            projectileRect.bottom > monsterRect.top &&
            projectileRect.top < monsterRect.bottom
        ) {
            // Collision détectée, supprimez le projectile et le monstre
            console.log("touché")
            monster.remove();
            return true;

            // Ajoutez ici la logique de jeu liée à la collision (par exemple, augmentez le score du joueur)
        }
    });
    
    return false; // Pas de collision avec les monstres
}




