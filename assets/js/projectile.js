document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("perso");
    const map = document.getElementById("game");
    
    const projectile = document.createElement("div");
    projectile.className = "projectile"; // Appliquez des styles CSS pour le projectile
    map.appendChild(projectile);

    var projectileX = 270; // Position X initiale du projectile
    var projectileY = 200; // Position Y initiale du projectile
    const limitMax = 450;
    
    projectile.style.top = projectileY + "px";
    projectile.style.left = projectileX + "px";

    var speed = 5;

    let isShooting = false; // Variable pour suivre si le projectile est en cours de tir

    function moveProjectile() {
        if (isShooting) {
            // Déplacez le projectile vers la droite (à titre d'exemple)
            projectileX += speed; // Ajustez la vitesse du projectile selon vos besoins
            projectile.style.left = projectileX + "px";

            // Vérifiez si le projectile est sorti de l'écran
            if (projectileX > limitMax) {
                console.log(projectileX)
                console.log("out")
                stopShooting();
            } else {
                requestAnimationFrame(moveProjectile);
            }
        }
    }

    function startShooting() {
        if (!isShooting) {
            projectile.style.display = "block";

            // Position initiale du projectile (à partir de l'image de base)
            projectileX = parseInt(player.style.left.slice(0, -2)) + player.offsetWidth;
           // projectileY = parseInt(player.style.top.slice(0, -2));
            console.log(projectileY)
            projectile.style.left = projectileX + "px";
            //projectile.style.top = projectileY + "px";

            isShooting = true;
            moveProjectile();
        }
    }

    function stopShooting() {
        isShooting = false;
        projectile.style.display = "none"; // Masquez le projectile ou supprimez-le
    }

    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)
    document.addEventListener("mousedown", function() {
        startShooting();
    });
});
