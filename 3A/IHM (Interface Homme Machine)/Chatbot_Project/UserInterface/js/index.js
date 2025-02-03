//
//  index.js
//  UserInterface
//  Created by Ingenuity i/o on 2025/01/10
//
//  Un formulaire interactif
//  Copyright © 2023 Ingenuity i/o. All rights reserved.
//

// Server connection
function isConnectedToServerChanged(isConnected) {
    if (isConnected)
        document.getElementById("connectedToServer").style.background = 'green';
    else
        document.getElementById("connectedToServer").style.background = 'red';
}

// Inputs
var Reception_RepInputCount = 0;
function Reception_RepInputCallback(type, name, valueType, value, myData) {
    console.log(`[DEBUG] Callback appelé pour : ${name} | Type: ${type} | Value: ${value} | Count: ${Reception_RepInputCount}`);
    Reception_RepInputCount++;
    document.getElementById("Reception_Rep_input").innerHTML = Reception_RepInputCount + " times";
}

// Attributes
function MessageAttributeCallback(type, name, valueType, value, myData) {
    console.log(name + " changed to " + value);
}

function ReponseAttributeCallback(type, name, valueType, value, myData) {
    console.log(name + " changed to " + value);
}

// Services
function logServiceCall(serviceName, senderAgentName) {
    let logMessage = `${senderAgentName} a appelé le service ${serviceName}`;
    console.log(logMessage);

    // Ajout du log dans la zone de texte
    const serviceLogsTextArea = document.getElementById("services_logs");
    serviceLogsTextArea.value += logMessage + "\n";
    serviceLogsTextArea.scrollTop = serviceLogsTextArea.scrollHeight;
/*
    // Affichage sur le Whiteboard
    let params = JSON.stringify({
        "text": `Échange : ${serviceName}`,
        "x": 50,  // Position X sur le Whiteboard
        "y": 50,  // Position Y sur le Whiteboard
        "fontSize": 15,
        "color": "#ff0000" // jaune pour bien voir l'échange
    });*/

    IGS.callService("Whiteboard", "addText", params);
    console.log(`Message affiché sur le Whiteboard : Échange : ${serviceName}`);
}

function Recevoir_Question_UtilisateurServiceCallback(senderAgentName, senderAgentUUID, serviceName, serviceArguments, token, myData) {
    logServiceCall(serviceName, senderAgentName);
}

function Envoyer_Question_Au_BackendServiceCallback(senderAgentName, senderAgentUUID, serviceName, serviceArguments, token, myData) {
    logServiceCall(serviceName, senderAgentName);
}

function Afficher_Reponse_Au_ClientServiceCallback(senderAgentName, senderAgentUUID, serviceName, serviceArguments, token, myData) {
    logServiceCall(serviceName, senderAgentName);
}

// Initialize agent
IGS.netSetServerURL("ws://localhost:8080");
IGS.agentSetName("UserInterface");
IGS.observeWebSocketState(isConnectedToServerChanged);

IGS.definitionSetDescription("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n<html><head><meta name=\"qrichtext\" content=\"1\" /><meta charset=\"utf-8\" /><style type=\"text/css\">\np, li { white-space: pre-wrap; }\nhr { height: 1px; border-width: 0; }\nli.unchecked::marker { content: \"\\2610\"; }\nli.checked::marker { content: \"\\2612\"; }\n</style></head><body style=\" font-family:'Segoe UI'; font-size:9pt; font-weight:400; font-style:normal;\">\n<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">Un formulaire interactif</p></body></html>");

IGS.inputCreate("Reception_rep", ioTypes.IGS_IMPULSION_T, "");
IGS.outputCreate("Question", ioTypes.IGS_STRING_T, "");
IGS.attributeCreate("message", ioTypes.IGS_STRING_T, "");
IGS.attributeCreate("reponse", ioTypes.IGS_STRING_T, "");

IGS.observeInput("Reception_rep", Reception_RepInputCallback);
IGS.observeAttribute("message", MessageAttributeCallback);
IGS.observeAttribute("reponse", ReponseAttributeCallback);
IGS.serviceInit("recevoir_question_utilisateur", Recevoir_Question_UtilisateurServiceCallback);
IGS.serviceInit("envoyer_question_au_backend", Envoyer_Question_Au_BackendServiceCallback);
IGS.serviceInit("afficher_reponse_au_client", Afficher_Reponse_Au_ClientServiceCallback);

// Start the agent
IGS.start();

// HTML example
document.getElementById("serverURL").value = IGS.netServerURL();
document.getElementById("name").innerHTML = IGS.agentName();

function executeAction() {
    // Add code here if needed
}

// Update websocket config
function setServerURL() {
    IGS.netSetServerURL(document.getElementById("serverURL").value);
}

// Write outputs
function setQuestionOutput() {
    IGS.outputSetImpulsion("Question");
}

function submitOrder() {
    // Récupération des valeurs du formulaire
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;
    const size = document.getElementById("size").value;

    // Vérifier si les champs sont vides
    if (!type || !category || !quantity || !size) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return; // Arrêter l'exécution si un champ est vide
    }

    // Construire l'objet JSON
    const order = {
        type: type,
        category: category,
        quantity: parseInt(quantity), // Convertir en nombre si nécessaire
        size: size
    };

    // Convertir l'objet en chaîne JSON
    const question = JSON.stringify(order);
    console.log("Commande JSON envoyée :", question);

    // Vérifier si la sortie existe déjà
    if (!IGS._globalAgent.outputExists("Question")) {
        IGS.outputCreate("Question", ioTypes.IGS_STRING_T, ""); // Créer la sortie si nécessaire
    }

    // Définir la valeur de la sortie
    try {
        IGS.outputSetString("Question", question);
        console.log("Commande JSON envoyée avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'envoi de la commande JSON :", error);
    }

    // Déclencher une impulsion (notifie l'observateur)
    try {
        IGS.outputSetImpulsion("Question");
        console.log("Impulsion déclenchée pour 'Question'.");
    } catch (error) {
        console.error("Erreur lors du déclenchement de l'impulsion :", error);
    }

    // Affichage sur le Whiteboard uniquement si la question n'est pas vide
    if (question) {
        try {
            let params = JSON.stringify({
                "text": question,
                "x": 100,  // Position X sur le Whiteboard
                "y": 200,  // Position Y sur le Whiteboard
                "fontSize": 20,
                "color": "#000000"
            });

            IGS.callService("Whiteboard", "addText", params);
            console.log("Texte affiché sur le Whiteboard :", question);
            
        } catch (error) {
            console.error("Erreur lors de l'affichage sur le Whiteboard :", error);
        }
    }

    // Ajout du log dans la zone de texte
    const serviceLogsTextArea = document.getElementById("services_logs");
    serviceLogsTextArea.value += "Commande JSON envoyée au backend : " + question + "\n";
    serviceLogsTextArea.scrollTop = serviceLogsTextArea.scrollHeight;
}