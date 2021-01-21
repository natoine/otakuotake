# otakuotake
C'est un projet basé sur node.js

## secret  
Plusieurs secrets sont nécessaires dans ce projet. Vous trouverez des fichiers d'exemple dans /resources/secretsample qu'il faudra copier coller dans /resources/secret et modifier selon vos secrets.

## Modèle de données

Données au format json dans mongodb Atlas
exemple de données concernant un Saïan ; {"name":"Broly", "powerup":"no", "orientation":"badguy", "picture":"brolyss.jpg"}

## peupler la base de données

Le fichier database/characters.json contient un JSON Array de personnages.
Pour peupler la base de données il suffit de lancer : node populate.js