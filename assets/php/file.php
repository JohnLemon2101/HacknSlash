<?php

// Autorisez toutes les origines (à des fins de test, vous pouvez restreindre cela)
header("Access-Control-Allow-Origin: *");

// Autorisez certaines méthodes HTTP
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Autorisez certains en-têtes HTTP
header("Access-Control-Allow-Headers: Content-Type");

// Indiquez que les en-têtes CORS doivent être inclus dans la réponse
header("Access-Control-Allow-Credentials: true");



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Le script a été appelé avec une requête HTTP GET
    
    $nomFichier = $_GET["filePath"]; // Remplacez par le nom de votre fichier
    $response = array();
    
    if (!file_exists($nomFichier)) {
        // Le fichier existe
         file_put_contents($nomFichier, "CGE: 50,");
    }

    $contenu = file_get_contents($nomFichier);
    $gestionnaire = fopen($nomFichier, "r");
    if ($gestionnaire === false) {
        // Gestion de l'erreur, par exemple, le fichier n'a pas pu être ouvert
        $response["error"] = "Erreur lors de l'ouverture du fichier.";
    } else {
        // Lire le contenu du fichier
        $contenu = fread($gestionnaire, filesize($nomFichier));
        
        if ($contenu === false) {
            // Gestion de l'erreur, par exemple, le fichier n'a pas pu être lu
            $response["error"] = "Erreur lors de la lecture du fichier.";
        }

        fclose($gestionnaire); // Fermer le gestionnaire de fichier

        $arrayString = explode(",", $contenu);

        usort($arrayString, function($a, $b) {
            // Extraire les valeurs numériques de chaque élément
            preg_match('/\d+/', $a, $matchesA);
            preg_match('/\d+/', $b, $matchesB);
        
            // Comparer les valeurs numériques
            $valueA = isset($matchesA[0]) ? intval($matchesA[0]) : 0;
            $valueB = isset($matchesB[0]) ? intval($matchesB[0]) : 0;
        
            // return $valueA - $valueB; // Tri croissant
            // Pour un tri décroissant, inversez simplement la soustraction :
             return $valueB - $valueA;
        });

        $response["data"] = $arrayString;
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }


} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Le script a été appelé avec une requête HTTP POST
    return var_dump($_POST);
} 
/*
function ecrireDansFichier($texte) {
    // Ouvre le fichier en mode écriture (crée le fichier s'il n'existe pas)
    return $_POST;
    
    $nomFichier = "./../../monFichier.txt";
    
    $fichier = fopen($nomFichier, "w");

    // Vérifie si l'ouverture du fichier a réussi
    if ($fichier === false) {
        return "Impossible d'ouvrir le fichier pour l'écriture.";
    }

    // Écrit le texte dans le fichier
    $resultat = fwrite($fichier, $texte);

    // Vérifie si l'écriture a réussi
    if ($resultat === false) {
        return "Une erreur s'est produite lors de l'écriture dans le fichier.";
    }

    // Ferme le fichier
    fclose($fichier);

    return "Écriture réussie dans le fichier : " . $nomFichier;
}*/
/*
// Utilisation de la fonction pour écrire dans un fichier
$nomDuFichier = "monFichier.txt";
$texteAEcrire = "Ceci est le texte à écrire dans le fichier.";

$resultatEcriture = ecrireDansFichier($nomDuFichier, $texteAEcrire);
echo $resultatEcriture;
return $resultatEcriture;*/
?>
