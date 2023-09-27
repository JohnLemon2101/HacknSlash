
var customDialog;
const game = document.getElementById("game");

export function display(dialogId) {
    let dialog = document.getElementById(dialogId);
    createDialogContent(dialogId, "Game Over", "votre score est de ", " vague(s)", true, "playerName", "gameOver", 3)
    dialog.style.display = "block";
    testButton()
}

export function createDialogContent (dialogId, title, text, text2, isInput = false, inputName, buttonsType, optional = ""){
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
    
        
        customDialog.appendChild(div2)
        
        div2.appendChild(input)
    }

    let div3 = document.createElement("div")
    customDialog.appendChild(div3)

    switch(buttonsType){
        case "gameOver":
            let button1 = document.createElement("button")
            button1.id = "logButton"
            button1.textContent = "Enregistrer"
            div3.appendChild(button1)

            let button2 = document.createElement("button")
            button2.id = "restartButton"
            button2.textContent = "Rejouer"
            div3.appendChild(button2)

            break;
    }

    /*if (buttons.length >= 3){
        let button3 = document.createElement("button")
        button3.id = "cancelButton"
        button3.className = "customButton"
        button3.textContent = buttons[1]
        div3.appendChild(button3)
    }*/

    div3.style.width = "320px";
    div3.style.display = "flex";
    div3.style.justifyContent = "space-between"

    game.appendChild(customDialog);

}


function testButton(){
    let logButton = document.getElementById("logButton")
    let restartButton = document.getElementById("restartButton")

    if(logButton !== null){
        logButton.addEventListener("click", () => {
            // Action personnalisée à effectuer après avoir cliqué sur le bouton
            console.log("logButton !");

        });
    }

    if(restartButton !== null){
        restartButton.addEventListener("click", () => {
            // Action personnalisée à effectuer après avoir cliqué sur le bouton
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