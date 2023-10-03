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
const urlActuelle = window.location.href.slice(0, -5);
export const filepath = "./../../score.txt";
export const apiURL = urlActuelle + "8280/file.php";