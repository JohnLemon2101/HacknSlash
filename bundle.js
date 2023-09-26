/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/game.js":
/*!***************************!*\
  !*** ./assets/js/game.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeGame: () => (/* binding */ initializeGame)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./assets/js/player.js\");\n/* harmony import */ var _monster_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monster.js */ \"./assets/js/monster.js\");\n/* harmony import */ var _projectile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectile.js */ \"./assets/js/projectile.js\");\n// game.js\r\n\r\n\r\n\r\n\r\n\r\nfunction initializeGame() {\r\n    var map = document.getElementById(\"game\");\r\n    \r\n    console.log(\"tedst\")\r\n    // Récupérez la taille de la fenêtre\r\n    const windowWidth = window.innerWidth;\r\n    const windowHeight = window.innerHeight;\r\n\r\n    map.style.width = windowWidth + \"px\";\r\n    map.style.height = windowHeight + \"px\";\r\n\r\n    // Initialisation du jeu\r\n    (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();\r\n    (0,_monster_js__WEBPACK_IMPORTED_MODULE_1__.createMonster)();\r\n\r\n    // Gestion des événements clés (mouvement du joueur, tir, etc.)\r\n    document.addEventListener('keydown', function (event) {\r\n        // Gérer les événements clés du joueur (mouvement, tir, etc.)\r\n    });\r\n\r\n    // Boucle de jeu principale\r\n    requestAnimationFrame(gameLoop);\r\n}\r\n\r\nfunction gameLoop() {\r\n    // Mettre à jour la logique du jeu (mouvement, collisions, etc.)\r\n    \r\n    // Appeler la boucle de jeu à la prochaine frame\r\n    requestAnimationFrame(gameLoop);\r\n}\r\n\n\n//# sourceURL=webpack://hacknslash/./assets/js/game.js?");

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./assets/js/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    (0,_game__WEBPACK_IMPORTED_MODULE_0__.initializeGame)();\n});\n\n//# sourceURL=webpack://hacknslash/./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/monster.js":
/*!******************************!*\
  !*** ./assets/js/monster.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createMonster: () => (/* binding */ createMonster)\n/* harmony export */ });\nvar life = 2;\r\n\r\n// Positionnez le monstre aléatoirement sur la carte de jeu\r\nconst windowWidth = window.innerWidth;\r\nconst windowHeight = window.innerHeight;\r\n\r\nfunction createMonster() {\r\n    // Créez un élément div pour représenter le monstre\r\n    const monster = document.createElement(\"div\");\r\n    monster.className = \"monster\"; // Appliquez des styles CSS pour le monstre\r\n    \r\n    const maxX = windowWidth - 50; // Ajustez la largeur du monstre\r\n    const maxY = windowHeight - 50; // Ajustez la hauteur du monstre\r\n    \r\n    const randomX = Math.random() * maxX;\r\n    const randomY = Math.random() * maxY;\r\n    // Ajoutez le monstre à la carte de jeu\r\n    const map = document.getElementById(\"game\"); // Assurez-vous que vous avez un élément avec l'ID \"game\" pour votre carte de jeu\r\n    map.appendChild(monster);\r\n\r\n    // Ajoutez un gestionnaire d'événements pour gérer la logique du monstre\r\n    monster.addEventListener(\"click\", function() {\r\n        // Code à exécuter lorsque le monstre est cliqué (par exemple, réduire les points de vie du monstre, etc.)\r\n        // Vous pouvez ajouter ici la logique de jeu liée aux interactions avec le monstre\r\n        // Par exemple, vous pouvez supprimer le monstre après un certain nombre de clics\r\n        map.removeChild(monster);\r\n    });\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n    const monster = document.querySelector(\".monster\");\r\n\r\n    // Fonction pour déplacer le monstre aléatoirement\r\n    function moveMonster() {\r\n        const windowWidth = window.innerWidth;\r\n        const windowHeight = window.innerHeight;\r\n\r\n        const maxX = windowWidth - monster.clientWidth;\r\n        const maxY = windowHeight - monster.clientHeight;\r\n\r\n        const randomX = Math.random() * maxX;\r\n        const randomY = Math.random() * maxY;\r\n\r\n        monster.style.left = randomX + \"px\";\r\n        monster.style.top = randomY + \"px\";\r\n    }\r\n\r\n    // Déplacer le monstre lorsque la page est chargée\r\n    moveMonster();\r\n\r\n    // Déplacer le monstre à chaque clic de souris\r\n    monster.addEventListener(\"click\", moveMonster);\r\n});\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://hacknslash/./assets/js/monster.js?");

/***/ }),

/***/ "./assets/js/player.js":
/*!*****************************!*\
  !*** ./assets/js/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPlayer: () => (/* binding */ createPlayer)\n/* harmony export */ });\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ \"./assets/js/projectile.js\");\n\r\n\r\nvar speed = 5; // Vitesse de déplacement\r\nvar life = 2;\r\nvar damage = 1;\r\n\r\nconst windowWidth = window.innerWidth;\r\nconst windowHeight = window.innerHeight;\r\n\r\nfunction createPlayer() {\r\n    const player = document.createElement(\"div\");\r\n    const imagePlayer = document.createElement(\"img\");\r\n    player.id = \"player\";\r\n    imagePlayer.src = \"./assets/images/img.png\";\r\n    document.getElementById(\"game\").appendChild(player);\r\n    player.appendChild(imagePlayer);\r\n\r\n    // Définir la taille et la position initiale du joueur\r\n    const playerWidth = 20;\r\n    const playerHeight = 50;\r\n    player.style.width = playerWidth + \"px\";\r\n    player.style.height = playerHeight + \"px\";\r\n\r\n    // Position initiale du joueur (au centre de la fenêtre)\r\n\r\n    const initialX = (windowWidth - playerWidth) / 2;\r\n    const initialY = (windowHeight - playerHeight) / 2;\r\n\r\n    player.style.left = initialX + \"px\";\r\n    player.style.top = initialY + \"px\";\r\n}\r\n\r\n\r\n    function handlePlayerMovement(event, player) {\r\n        const playerRect = player.getBoundingClientRect();\r\n\r\n        var targetX = playerRect.left; // Position cible en X\r\n        var targetY = playerRect.top; // Position cible en Y\r\n\r\n        if(event.key === \"w\" && targetY > 0) { targetY -= speed; }\r\n        if(event.key === \"s\" && targetY < windowHeight - playerHeight) { targetY += speed; }\r\n        if(event.key === \"a\" && targetX > 0) { targetX -= speed; }\r\n        if(event.key === \"d\" && targetX < windowWidth - playerWidth) { targetX += speed; }\r\n\r\n\r\n        persoHitbox.style.top = positionY + \"px\";\r\n        persoHitbox.style.left = positionX + \"px\";\r\n    }    \r\n    \r\n    \r\n    document.addEventListener(\"keydown\", function(event) \r\n    {\r\n        handlePlayerMovement(event, player);\r\n        \r\n        requestAnimationFrame(movePlayer);\r\n    });\r\n\r\n    // Gestionnaire d'événement pour déclencher le tir (par exemple, un clic de souris)\r\n    map.addEventListener(\"mousedown\", function(event) {\r\n        (0,_projectile__WEBPACK_IMPORTED_MODULE_0__.startShooting)(event.clientX, event.clientY, damage);\r\n    });\r\n\r\n\r\n\r\n\r\n/*\r\nvar verification = setInterval(function(){\r\n    var persoHitboxTop = parseInt(window.getComputedStyle(persoHitbox).getPropertyValue(\"top\"))\r\n    var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue(\"left\"))\r\n    if(obstaclesLeft<20 && obstaclesLeft>0 && persoHitboxTop>=130){\r\n        obstacles.style.animation = \"none\";\r\n        //alert(\"Looser\")\r\n    }\r\n},1)*/\n\n//# sourceURL=webpack://hacknslash/./assets/js/player.js?");

/***/ }),

/***/ "./assets/js/projectile.js":
/*!*********************************!*\
  !*** ./assets/js/projectile.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startShooting: () => (/* binding */ startShooting)\n/* harmony export */ });\nconst player = document.getElementById(\"perso\");\r\nconst map = document.getElementById(\"game\");\r\n\r\nconst windowWidth = window.innerWidth;\r\nconst windowHeight = window.innerHeight;\r\n\r\nconst limitMin = 0;\r\n\r\nvar projectileX = 0;\r\nvar projectileY = 0;\r\n\r\nvar speed = 20;\r\nvar damage = 0;\r\n\r\nlet isShooting = false; // Variable pour suivre si le projectile est en cours de tir\r\n\r\n// Variables pour stocker les coordonnées du point de clic\r\nvar targetX = 0;\r\nvar targetY = 0;\r\n\r\nfunction startShooting(x, y, damagePlayer) {\r\n    damage = damagePlayer;\r\n    console.log(damage)\r\n    let playerHitbox = player.getBoundingClientRect();\r\n\r\n    const projectile = document.createElement(\"div\");\r\n    projectile.className = \"projectile\"; // Appliquez des styles CSS pour le projectile\r\n    map.appendChild(projectile);\r\n\r\n    projectileX = playerHitbox.left; // Position X initiale du projectile\r\n    projectileY = playerHitbox.top + playerHitbox.height / 2; // Position Y initiale du projectile\r\n\r\n    projectile.style.left = projectileX + \"px\";\r\n    projectile.style.top = projectileY + \"px\";\r\n            \r\n    targetX = x;\r\n    targetY = y;     \r\n\r\n    isShooting = true;\r\n    moveProjectile(projectileX, projectileY, targetX, targetY, projectile)\r\n    \r\n}\r\n\r\nfunction moveProjectile(projectileX, projectileY, targetX, targetY, projectile) {\r\n    if (isShooting) {\r\n            \r\n        let deltaX = targetX - projectileX;\r\n        let deltaY = targetY - projectileY;\r\n    \r\n        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);\r\n    \r\n        let moveX = (deltaX / distance) * speed;\r\n        let moveY = (deltaY / distance) * speed;\r\n    \r\n        // Fonction pour mettre à jour la position de la balle jusqu'à la cible\r\n        function updatePosition() {\r\n            var projHitBox = projectile.getBoundingClientRect();\r\n\r\n            if (\r\n                projHitBox.left > limitMin &&\r\n                projHitBox.top > limitMin &&\r\n                projHitBox.right < windowWidth &&\r\n                projHitBox.bottom < windowHeight \r\n            ) {\r\n                projectileX += moveX;\r\n                projectileY += moveY;\r\n                \r\n                projectile.style.left = projectileX + \"px\";\r\n                projectile.style.top = projectileY + \"px\";\r\n                \r\n                requestAnimationFrame(updatePosition); // Demander une nouvelle frame pour la mise à jour continue\r\n            }else{\r\n                stopShooting(projectile);\r\n            }\r\n        }\r\n        // Lancer la mise à jour de la position\r\n        updatePosition();\r\n    }\r\n}\r\n\r\nfunction stopShooting(projectile) {\r\n    isShooting = false;\r\n    map.removeChild(projectile);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://hacknslash/./assets/js/projectile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/main.js");
/******/ 	
/******/ })()
;