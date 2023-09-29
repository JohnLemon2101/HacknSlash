import { filepath, apiURL } from './data.js';
import axios from 'axios';

var customDialog;
const game = document.getElementById("game");
var score;

export function display(dialogId) {
    let dialog = document.getElementById(dialogId);
    createDialogContent(dialogId, "Game Over", "votre score est de ", " vague(s)", true, "playerName", "gameOver", 3)
    dialog.style.display = "block";
    testButton()
}

export function createDialogContent (dialogId, title, text, text2, isInput = false, inputName, buttonsType, optional = ""){
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

    const params = new URLSearchParams({ filePath: filepath });
    const urlAvecParametres = `${apiURL}?${params}`;
    
    let div3 = document.createElement("div")
    customDialog.appendChild(div3)

    const ul = document.createElement("ul");

    axios.get(urlAvecParametres)
    .then(response => {
        console.log(response)
        // Traitement de la réponse icidw
        let score = 1;
        response.data.data.forEach(item => {
            // item contient chaque objet de response.data
            const li = document.createElement("li");
            li.textContent = score + "# " +item; // Définissez le texte de l'élément <li> sur l'élément de données
            ul.appendChild(li);
            console.log(item); // Affiche la valeur de la clé "key" de l'objet
            // Faites ce que vous devez faire avec chaque élément ici
            score++;
        });
    })
    .catch(error => {
        console.error('Erreur :', error);
    });

    div3.appendChild(ul)
    let div4 = document.createElement("div")
    customDialog.appendChild(div4)

    switch(buttonsType){
        case "gameOver":
            let button1 = document.createElement("button")
            button1.id = "logButton"
            button1.textContent = "Enregistrer"
            div4.appendChild(button1)

            let button2 = document.createElement("button")
            button2.id = "restartButton"
            button2.textContent = "Rejouer"
            div4.appendChild(button2)

            break;
        case "upgrade":
            //TODO ajouter des améliorations (vie/degat/?) déjà 2 à améliorer 
        
            break;
    }

    /*if (buttons.length >= 3){
        let button3 = document.createElement("button")
        button3.id = "cancelButton"
        button3.className = "customButton"
        button3.textContent = buttons[1]
        div3.appendChild(button3)
    }*/

    div4.style.width = "320px";
    div4.style.display = "flex";
    div4.style.justifyContent = "space-between"

    game.appendChild(customDialog);

}


function testButton(){
    let logButton = document.getElementById("logButton")
    let restartButton = document.getElementById("restartButton")

    if(logButton !== null){
        logButton.addEventListener("click", () => {
            // TODO faire un enregistrement du score avec un pseudo de 3 lettres dans un txt ou autre (JSON ? peut etre plus simple)
            //TODO afficher les 5 premiers des scores.
           
            const playerName = document.getElementById("playerName");

            // Créez un objet FormData vide
            const formData = new FormData();

            // Ajoutez vos valeurs au FormData
            formData.append('name', playerName.value);
            formData.append('score', score);

            // URL du script PHP sur votre serveur
            const params = new URLSearchParams({ filePath: filepath });
            const urlAvecParametres = `${apiURL}?${params}`;
            
            axios.post(urlAvecParametres, formData)
            .then(response => {
              // Traitement de la réponse ici
              console.log(response.data); // Les données renvoyées par le serveur
            })
            .catch(error => {
              console.error('Erreur :', error);
            });
            /*
            const jsonData = JSON.stringify(data);

            const blob = new Blob([jsonData], { type: "application/json" });
            // Créez un lien de téléchargement pour le fichier JSON
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "donnees.json"; // Nom du fichier JSON à télécharger
            downloadLink.textContent = "Télécharger le fichier JSON";

            // Ajoutez le lien au DOM
            document.body.appendChild(downloadLink);

            // Cliquez sur le lien pour déclencher le téléchargement
            downloadLink.click();
              */
            
            //const jsonData = JSON.stringify(dataToWrite, null, 2); // Convertir l'objet en chaîne JSON avec mise en forme
            
            //fs.writeFileSync("score.json", jsonData, "utf-8");
            


            console.log("logButton !");

        });
    }

    if(restartButton !== null){
        restartButton.addEventListener("click", () => {
            location.reload();
        });
    }
}
/*
<div id="customDialog" class="dialog">
            <p>Ceci est une boîte de dialogue personnalisée.</p>
            <button id="customButton">Option personnalisée</button>
        </div>

*/
/*
customButton.addEventListener("click", () => {
    // Action personnalisée à effectuer après avoir cliqué sur le bouton
    console.log("Option personnalisée sélectionnée !");
    customDialog.style.display = "none";
});*/