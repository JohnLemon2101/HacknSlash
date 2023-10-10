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
         file_put_contents($nomFichier, "");
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

        $response["data"] = array_slice($arrayString, 0, 5);
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }


} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Le script a été appelé avec une requête HTTP POST

    $nomFichier = $_POST["filePath"];
    $playerName = $_POST["name"];
    $score = $_POST["score"];
    $response = array();

    $fichier = fopen($nomFichier, "a");

    if ($fichier === false) {
        // Gestion de l'erreur, par exemple, le fichier n'a pas pu être ouvert
        $response["error"] = "Impossible d'ouvrir le fichier pour l'écriture.";
    } else {

        $contenu = file_get_contents($nomFichier);
        if($contenu == ''){
            $texte = $playerName.": ".$score;
        }
        else{
            $texte = ",".$playerName.": ".$score;
        }
        
        $resultat = fwrite($fichier, $texte);

        if ($resultat === false) {
            // Gestion de l'erreur, par exemple, l'écriture a échoué
            $response["error"] = "Une erreur s'est produite lors de l'écriture dans le fichier.";
        } else {
            $response["message"] = "Écriture réussie dans le fichier : " . $nomFichier;
        }

        fclose($fichier); // Fermez le fichier après l'écriture
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

