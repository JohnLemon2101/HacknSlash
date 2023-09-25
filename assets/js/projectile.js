document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("perso");
    const map = document.getElementById("game");
    var playerHitbox = player.getBoundingClientRect();

    const projectile = document.createElement("div");
    projectile.className = "projectile"; // Appliquez des styles CSS pour le projectile
    map.appendChild(projectile);
    projectile.style.display = "none";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const limitMin = 0;

    var projectileX = playerHitbox.left + playerHitbox.width; // Position X initiale du projectile
    var projectileY = playerHitbox.top - playerHitbox.height / 2; // Position Y initiale du projectile

    projectile.style.left = projectileX + "px";
    projectile.style.top = projectileY + "px";

    var speed = 20;

    let isShooting = false; // Variable pour suivre si le projectile est en cours de tir

    // Variables pour stocker les coordonnées du point de clic
    var targetX = 0;
    var targetY = 0;

    function startShooting(x, y) {
        if (!isShooting) {
            projectile.style.display = "block";

            playerHitbox = player.getBoundingClientRect();

            // Position initiale du projectile (à partir de l'image de base)
            projectileX = playerHitbox.left + playerHitbox.width;
            projectileY = playerHitbox.top - playerHitbox.height / 2;
            
            projectile.style.left = projectileX + "px";
            projectile.style.top = projectileY + "px";
                
            targetX = x;
            targetY = y;     

            isShooting = true;
            moveProjectile(projectileX, projectileY, targetX, targetY)
        }
    }

    function moveProjectile(projectileX, projectileY, targetX, targetY) {
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
                    projectileX += moveX;
                    projectileY += moveY;
                    
                    projectile.style.left = projectileX + "px";
                    projectile.style.top = projectileY + "px";
                    
                    requestAnimationFrame(updatePosition); // Demander une nouvelle frame pour la mise à jour continue
                }else{
                    stopShooting();
                }
            }
                
                // Lancer la mise à jour de la position
                updatePosition();
        }
        
    }

    function stopShooting() {
        isShooting = false;
        projectile.style.display = "none"; // Masquez le projectile ou supprimez-le
    }

    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
    map.addEventListener("mousedown", function(event) {
        startShooting(event.clientX, event.clientY);
    });
});
