document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("perso");
    const map = document.getElementById("game");

    const projectile = document.createElement("div");
    projectile.className = "projectile"; // Appliquez des styles CSS pour le projectile
    map.appendChild(projectile);
    //projectile.style.display = "none";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const limitMaxX = windowWidth - parseInt(player.style.width.slice(0, -2));
    const limitMaxY = windowHeight - parseInt(player.style.height.slice(0, -2));
    const limitMin = 0;

    var projectileX = parseInt(player.style.left.slice(0, -2)) + parseInt(player.style.width.slice(0, -2)); // Position X initiale du projectile
    var projectileY = parseInt(player.style.top.slice(0, -2)) - parseInt(player.style.height.slice(0, -2)) / 2; // Position Y initiale du projectile

    projectile.style.left = projectileX + "px";
    projectile.style.top = projectileY + "px";

    var speed = 5;

    let isShooting = false; // Variable pour suivre si le projectile est en cours de tir

    // Variables pour stocker les coordonnées du point de clic
    var targetX = 0;
    var targetY = 0;

    function moveProjectile() {
        if (isShooting) {
            // Calcul de la direction entre la position actuelle du projectile et le point de clic
            const deltaX = targetX - projectileX;
            const deltaY = targetY - projectileY;
    
            // Calcul de la distance totale entre la position actuelle et le point de clic
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Calcul des composantes de déplacement en fonction de la vitesse
            const moveX = (deltaX / distance) * speed;
            //const moveY = (deltaY / distance) * speed;
    
            // Mise à jour de la position du projectile
            projectileX += moveX;
            //projectileY += moveY;
    
            projectile.style.left = projectileX + "px";
            projectile.style.top = projectileY + "px";
    
            // Vérification si le projectile atteint la fin de la carte
            if (
                projectileX > limitMaxX  ||
                projectileY > limitMaxY  ||
                projectileX < limitMin  ||
                projectileY < limitMin 
            ) {
                console.log(projectileX);
                console.log(projectileY);
                console.log("out");
                stopShooting();
            } else {
                requestAnimationFrame(moveProjectile);
            }
        }
    }

    function startShooting(x, y) {
        if (!isShooting) {
            projectile.style.display = "block";

            const playerRect = player.getBoundingClientRect();

            // Position initiale du projectile (à partir de l'image de base)
            projectileX = playerRect.left + playerRect.width;
            //projectileY = playerRect.top;

            projectile.style.left = projectileX + "px";
            projectile.style.top = projectileY + "px";
                
            console.log(playerRect.top)
            console.log(projectile.style.top)

            targetX = x;
            //targetY = y;     

            //console.log("co")
            //console.log(targetX)
           // console.log(targetY)

            //let finalPosition = calculateFinalPosition(projectileX, projectileY, targetX, targetY)
            //targetX = finalPosition.x;
            //targetY = finalPosition.y; 

            console.log("targetX")
            console.log(targetX)
            //console.log(targetY)

            isShooting = true;
            moveProjectile();
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

    function calculateFinalPosition(projectileX, projectileY, targetX, targetY) {
        let deltaX = targetX - projectileX;
        let deltaY = targetY - projectileY;
    
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
        let moveX = (deltaX / distance) * speed;
        let moveY = (deltaY / distance) * speed;
    
        // Fonction pour mettre à jour la position de la balle jusqu'à la cible
        function updatePosition() {
            if (
                projectileX > limitMin &&
                projectileY > limitMin &&
                projectileX < limitMaxX &&
                projectileY < limitMaxY 
            ) {
                projectileX += moveX;
                projectileY += moveY;
                
                projectile.style.left = projectileX + "px";
                projectile.style.top = projectileY + "px";
                
                requestAnimationFrame(updatePosition); // Demander une nouvelle frame pour la mise à jour continue
            }
        }
        
        // Lancer la mise à jour de la position
        updatePosition();
        
        return { x: projectileX, y: projectileY };
    }


    
    
});
