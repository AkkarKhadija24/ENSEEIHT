//
//  index.js
//  Backend
//  Created by Ingenuity i/o on 2025/01/18
//
//  Ce backend récupère les données de l'input, les traite, et les renvoie dans l'output.
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
var InputInputCount = 0;
var isProcessing = false; // Variable pour éviter les traitements multiples

function InputInputCallback(type, name, valueType, value, myData) {
    if (isProcessing) return; // Si un traitement est déjà en cours, on quitte
    isProcessing = true; // Marquer le début du traitement

    console.log(`[DEBUG] Callback appelé pour : ${name} | Type: ${type} | Value: ${value} | Count: ${InputInputCount}`);
    InputInputCount++;
    document.getElementById("Input_input").innerHTML = InputInputCount + " times";

    // Traiter les données reçues dans l'input si value n'est pas vide
    const donneesTraitees = processData(value);

    // Envoyer les données traitées dans l'output une seul fois
    try { // une seule fois
        
        IGS.outputSetString("output", donneesTraitees);
        console.log(`Données envoyées dans l'output : ${donneesTraitees}`);
    } catch (error) {
        console.error("Erreur lors de l'envoi des données dans l'output :", error);
    }

    isProcessing = false; // Marquer la fin du traitement
}

// Fonction pour traiter les données (exemple simple)
function processData(data) {
    // Ici, tu peux ajouter une logique de traitement des données
    // Par exemple, convertir en majuscules ou ajouter un préfixe
    //return `Commande effectuée: ${data.toUpperCase()}` si data non vide
    if (data) return `Commande effectuée: ${data.toUpperCase()}`;
}

// Initialize agent
IGS.netSetServerURL("ws://localhost:8080");
IGS.agentSetName("Backend");
IGS.observeWebSocketState(isConnectedToServerChanged);

// Créer un input pour recevoir les données
IGS.inputCreate("input", ioTypes.IGS_STRING_T, ""); // Utiliser IGS_STRING_T au lieu de IGS_IMPULSION_T

// Créer un output pour envoyer les données traitées
IGS.outputCreate("output", ioTypes.IGS_STRING_T, "");

// Observer l'input pour déclencher le callback
IGS.observeInput("input", InputInputCallback);

// Démarrer l'agent
IGS.start();

//
// HTML example
//

document.getElementById("serverURL").value = IGS.netServerURL();
document.getElementById("name").innerHTML = IGS.agentName();

function executeAction() {
    // Ajouter du code ici si nécessaire
}

// Mettre à jour la configuration WebSocket
function setServerURL() {
    IGS.netSetServerURL(document.getElementById("serverURL").value);
}

// Écrire dans l'output
function setOutputOutput() {
    IGS.outputSetImpulsion("output");
}