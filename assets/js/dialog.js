import { filepath, apiURL } from './data.js';
import axios from 'axios';

var customDialog;
const game = document.getElementById("game");
var score;

export function displayGameOver(dialogId, score) {
    let dialog = document.getElementById(dialogId);
    createDialogContent(dialogId, "Game Over", "votre score est de ", " vague(s)", true, "playerName", "gameOver", score)
    dialog.style.display = "block";
    testButton()
}

export function displayUpgrade(dialogId, vagues) {
    let dialog = document.getElementById(dialogId);
    if(vagues == 5){
        createDialogContent(dialogId, "Upgrade", "Veuillez choisir votre améloration", "", false, "", "upgrade")
        
        testButton()
    }
    dialog.style.display = "block";
}

function createDialogContent (dialogId, title, text, text2 = "", isInput = false, inputName, buttonsType, optional = ""){
    score = optional;
    customDialog = document.getElementById(dialogId);
    let div1 = document.createElement("div")
    let titleElement = document.createElement("h1");
    let textElement = document.createElement("p");

    titleElement.textContent = title;
    textElement.textContent = text + optional + text2;

    customDialog.appendChild(div1)

    div1.appendChild(titleElement)
    div1.appendChild(textElement)

    if(isInput){
        let div2 = document.createElement("div")
        let input = document.createElement("input");
        input.type = "text"
        input.placeholder = "3 initiales"
        input.maxLength = 3
        input.name = inputName
        input.id = inputName
    
        
        customDialog.appendChild(div2)
        
        div2.appendChild(input)
    }
    
    if(dialogId == "gameOver"){

        const params = new URLSearchParams({ filePath: filepath });
        const urlAvecParametres = `${apiURL}?${params}`;

        let div3 = document.createElement("div")
        customDialog.appendChild(div3)
    
        const ul = document.createElement("ul");
    
        axios.get(urlAvecParametres)
        .then(response => {
            // Traitement de la réponse icidw
            let score = 1;
            response.data.data.forEach(item => {
                // item contient chaque objet de response.data
                if(item){
                    const li = document.createElement("li");
                    li.textContent = score + "# " +item; // Définissez le texte de l'élément <li> sur l'élément de données
                    ul.appendChild(li);
                    // Faites ce que vous devez faire avec chaque élément ici
                    score++;
                }
                
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
    
        div3.appendChild(ul)
    }
    let div4 = document.createElement("div")
    div4.id = "buttonDiv";
    customDialog.appendChild(div4)

    switch(buttonsType){
        case "gameOver":
            let button1 = document.createElement("button")
            button1.id = "logButton"
            button1.textContent = "save & play"
            div4.appendChild(button1)

            let button2 = document.createElement("button")
            button2.id = "restartButton"
            button2.textContent = "Rejouer"
            div4.appendChild(button2)

            break;
        case "upgrade":
            //TODO ajouter des améliorations (vie/degat/?) déjà 2 à améliorer 
            let button3 = document.createElement("button")
            var imgLife = document.createElement("img");
            imgLife.src = "./assets/images/full_heart.png";
            button3.id = "lifeButton"
            button3.className = "upgradeButton"
            button3.textContent = "+1 vie"
            button3.appendChild(imgLife)
            div4.appendChild(button3)

            let button4 = document.createElement("button")
            var imgDamage = document.createElement("img");
            imgDamage.src = "./assets/images/sword.png";
            button4.id = "damageButton"
            button4.className = "upgradeButton"
            button4.textContent = "+1 dégat"
            button4.appendChild(imgDamage)
            div4.appendChild(button4)

            let button5 = document.createElement("button")
            var imgRegen = document.createElement("img");
            imgRegen.src = "./assets/images/full_heart.png";
            button5.id = "regenButton"
            button5.className = "upgradeButton"
            button5.textContent = "full regen"
            button5.appendChild(imgRegen)
            div4.appendChild(button5)

            customDialog.style.width = "630px"
            break;
    }

    game.appendChild(customDialog);

}


function testButton(){
    let logButton = document.getElementById("logButton")
    let restartButton = document.getElementById("restartButton")
    let lifeButton = document.getElementById("lifeButton")
    let damageButton = document.getElementById("damageButton")
    let regenButton = document.getElementById("regenButton")

    if(logButton !== null){
        logButton.addEventListener("click", () => {
            // TODO faire un enregistrement du score avec un pseudo de 3 lettres dans un txt ou autre (JSON ? peut etre plus simple)
            //TODO afficher les 5 premiers des scores.
           
            const playerName = document.getElementById("playerName");

            // Créez un objet FormData vide
            const formData = new FormData();

            // Ajoutez vos valeurs au FormData
            formData.append('filePath', filepath);
            formData.append('name', playerName.value);
            formData.append('score', score);

            // URL du script PHP sur votre serveur
            const urlAvecParametres = `${apiURL}`;
            
            axios.post(urlAvecParametres, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Définissez le type de contenu comme "multipart/form-data"
                },
                timeout: 10000, // 10 secondes
              })
            .then(response => {
              // Traitement de la réponse ici
            })
            .catch(error => {
                location.reload();
            });

           

        });
    }

    if(restartButton !== null){
        restartButton.addEventListener("click", () => {
            location.reload();
        });
    }

    
    if(lifeButton !== null){
        lifeButton.addEventListener("click", () => {
            let player = document.getElementById("player")
 
            player.dataset.initialLife = parseInt(player.dataset.initialLife) + 1;
            player.dataset.life = parseInt(player.dataset.life) + 1;


            let hp = document.getElementById("hp");
            hp.style.width = 20 * player.dataset.initialLife + "px";

            let imageHeart = document.createElement("img");
            imageHeart.src = "./assets/images/full_heart.png";
            imageHeart.className = "heart";
            imageHeart.id = "heart" + parseInt(player.dataset.initialLife - 1);
            hp.appendChild(imageHeart);


            document.getElementById("upgrade").style.display = "none";
        });
    }

    if(damageButton !== null){
        damageButton.addEventListener("click", () => {
            let player = document.getElementById("player")

            player.dataset.damage = parseInt(player.dataset.damage) + 1;
            
            document.getElementById("upgrade").style.display = "none";
        });
    }

    if(regenButton !== null){
        regenButton.addEventListener("click", () => {
            let player = document.getElementById("player")

            player.dataset.life = player.dataset.initialLife
            
            document.getElementById("upgrade").style.display = "none";
        });
    }


}
