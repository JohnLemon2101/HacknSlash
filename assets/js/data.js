//data.js
// taille de la map
export var windowWidth = window.innerWidth;
export var windowHeight = window.innerHeight;

// information du joueur
export var playerWidth = 20;
export var playerHeight = 50;
export var speedY = 5; // Vitesse de déplacement
export var speedX = (speedY * windowWidth) / playerWidth;

//info monstre
export const monsterHeight = 50;
export const monsterWidth = 50;

//gestion de fichier
export const filepath = "./../../score.txt";
export const apiURL = "http://localhost:8000/file.php";