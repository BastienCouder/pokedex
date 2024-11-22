# CI/CD Pokedex

## Description

Ce dépôt contient un projet Pokedex Pokémon développé en Node.js et configuré avec GitHub Actions pour implémenter un pipeline CI/CD robuste. L’objectif est d’assurer une intégration continue et un déploiement fiable, tout en garantissant la qualité et la stabilité de l’application via des tests automatisés.

## Étapes du flux de travail CI/CD

### Workflow de construction (`build.yml`)
1. **Checkout code** : Clone le dépôt dans l'environnement CI.
2. **Set up Node.js** : Installe Node.js (v20) et met en cache les dépendances pour une exécution plus rapide.
3. **Installer les dépendances** : Utilise `npm ci` pour installer toutes les dépendances listées dans `package-lock.json`.
4. **Run Prettier** : Vérifie le formatage du code.
5. **Lancer ESLint** : Assure la qualité du code.
6. **Vérifier les types TypeScript** : Valide la sécurité des types du projet.
7. **Construire le projet** : Compile le projet pour la production.

### Cypress Workflow (`cypress.yml`)
1. **Checkout code** : Clone le dépôt dans l'environnement CI.
2. **Installation de Node.js** : Installe Node.js (v20) et met en cache les dépendances.
3. **Installer les dépendances** : Utilise `npm ci` pour installer toutes les dépendances.
4. **Démarrer l'application** : Lance l'application dans un environnement de test.
5. **Attendre que l'application soit prête** : S'assure que l'application est accessible avant d'exécuter les tests.
6. **Exécuter les tests Cypress** : Exécute les tests E2E avec l'enregistrement vidéo activé.
7. **Télécharger les vidéos Cypress** : Sauvegarde les vidéos des tests en tant qu'artefacts pour examen.

### SSH-AGENT (ssh-agent.yml)
1. **Checkout Code** : Clone le code source depuis le dépôt GitHub pour analyser ou exécuter des commandes liées au projet.
2. **Start SSH Agent** : Configure un agent SSH en utilisant une clé privée stockée dans les secrets GitHub.
3. **Add Known Hosts** : Ajoute l'empreinte numérique du serveur distant dans le fichier `~/.ssh/known_hosts` pour autoriser la connexion sans interaction manuelle.
4. **Execute Remote Command** : Exécute la commande `ls` pour vérifier l'accès au serveur et lister les fichiers disponibles.

###  Déploiement (deploy.yml)
1. **Checkout code** : Clone le dépôt dans l'environnement CI.
2. **Installation de Node.js** : Installe Node.js (v20) et met en cache les dépendances.
3. **Installer les dépendances** : Utilise `npm ci` pour installer toutes les dépendances.
4. **Build Project** : Compile l’application en mode production.
5. **Créer le Fichier .env** : Génère un fichier .env contenant les clés API nécessaires à l’application.
6. **Configurer l’Agent SSH** : Configure un agent SSH avec la clé privée stockée dans les secrets GitHub.
7. **Ajouter le Serveur aux known_hosts** : Enregistre le serveur distant dans le fichier ~/.ssh/known_hosts pour éviter les avertissements lors des connexions.
8. **Déployer les Fichiers via SCP** : Transfère les fichiers compilés vers le serveur distant à l’aide de scp.
9. **Déplacer les Fichiers sur le Serveur** : Met les fichiers à jour dans le répertoire /var/www/html/pokedex et configure les permissions.

## Stratégie de branche

Pour garantir la stabilité et la qualité du projet, nous utilisons une stratégie de branche structurée :

`main :`
Contient le code en production.
Toute modification est soumise via une Pull Request (PR) et doit passer tous les pipelines CI/CD.

`dev :`
Branche principale pour le développement.
Les nouvelles fonctionnalités et correctifs sont fusionnés ici pour des tests avant d’être promus en production.

Branches de Fonctionnalités (feature/nom-fonctionnalité) :
Utilisées pour développer de nouvelles fonctionnalités.
Fusionnées dans dev une fois prêtes.
