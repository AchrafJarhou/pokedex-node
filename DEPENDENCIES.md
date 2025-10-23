# 📦 Dépendances du Projet - Pokémon API

Ce document liste toutes les dépendances installées dans le projet et explique leur utilité.

---

## 🚀 Dependencies (Production)

Ces packages sont nécessaires pour faire fonctionner l'application en production.

### 1. **Express** - `^4.18.2`

```bash
npm install express
```

**Utilisation dans le projet :**

- Framework web Node.js pour créer des serveurs HTTP et des API REST
- Utilisé dans : `app.js`
- **Fonctions utilisées :**
  - `express()` - Créer l'application Express
  - `app.get()` - Définir des routes GET
  - `app.use()` - Ajouter des middlewares
  - `app.listen()` - Démarrer le serveur sur le port 3000

**Exemple d'utilisation :**

```javascript
const express = require("express");
const app = express();

app.get("/api/pokemons", (req, res) => {
  // Récupérer tous les pokémons
});
```

---

### 2. **Serve-favicon** - `^2.5.1`

```bash
npm install serve-favicon
```

**Utilisation dans le projet :**

- Middleware pour servir le favicon (icône du site dans l'onglet du navigateur)
- Utilisé dans : `app.js`
- **Fonctions utilisées :**
  - `favicon(path)` - Servir le fichier favicon.ico

**Exemple d'utilisation :**

```javascript
const favicon = require("serve-favicon");
app.use(favicon(__dirname + "/favicon.ico"));
```

---

## 🛠️ DevDependencies (Développement)

Ces packages sont uniquement nécessaires pendant le développement.

### 3. **Morgan** - `^1.10.1`

```bash
npm install morgan --save-dev
```

**Utilisation dans le projet :**

- Logger HTTP pour Node.js
- Affiche les requêtes HTTP dans la console (méthode, URL, statut, temps de réponse)
- Utilisé dans : `app.js`
- **Fonctions utilisées :**
  - `morgan("dev")` - Mode développement avec couleurs

**Exemple d'utilisation :**

```javascript
const morgan = require("morgan");
app.use(morgan("dev"));
```

**Exemple de sortie console :**

```
GET /api/pokemons 200 15.123 ms - 2456
GET /api/pokemons/1 200 3.456 ms - 234
```

---

### 4. **Nodemon** - `^3.1.10`

```bash
npm install nodemon --save-dev
```

**Utilisation dans le projet :**

- Outil qui redémarre automatiquement le serveur Node.js quand les fichiers sont modifiés
- Utilisé dans : `package.json` (script `start`)
- **Configuration :**
  - Script : `"start": "nodemon app.js"`
  - Commande : `npm run start`

**Avantages :**

- ✅ Pas besoin de redémarrer manuellement le serveur
- ✅ Détecte automatiquement les changements dans les fichiers
- ✅ Gain de temps pendant le développement

---

## 📁 Structure du Projet

```
node-pokemon-api/
├── app.js              # Point d'entrée, serveur Express
├── helpers.js          # Fonctions utilitaires (success)
├── mock-pokemon.js     # Données des pokémons (mock data)
├── favicon.ico         # Icône du site
├── package.json        # Configuration npm et dépendances
├── .gitignore          # Fichiers à ignorer par Git
└── DEPENDENCIES.md     # Ce fichier
```

---

## 🎯 Routes API Disponibles

### GET `/`

- **Description :** Page d'accueil
- **Réponse :** "Hello again World !"

### GET `/api/pokemons`

- **Description :** Récupérer la liste de tous les pokémons
- **Réponse :** JSON avec message et tableau de pokémons
- **Utilise :** `helpers.success()`, `mock-pokemon.js`

### GET `/api/pokemons/:id`

- **Description :** Récupérer un pokémon spécifique par son ID
- **Paramètre :** `id` (numéro du pokémon)
- **Réponse :** JSON avec message et pokémon trouvé
- **Utilise :** `helpers.success()`, `mock-pokemon.js`

---

## 🚀 Commandes Utiles

### Installation des dépendances

```bash
npm install
```

### Démarrer le serveur en mode développement

```bash
npm run start
```

_(Utilise nodemon pour le rechargement automatique)_

### Installer une nouvelle dépendance

```bash
# Production
npm install <package-name>

# Développement
npm install <package-name> --save-dev
```

---

## 📝 Modules Personnalisés

### `helpers.js`

**Fonction :** `success(message, data)`

- Formate les réponses API de manière standardisée
- Retourne un objet avec `message` et `data`

**Exemple :**

```javascript
const { success } = require("./helpers");
res.json(success("Opération réussie", { id: 1, name: "Pikachu" }));
```

### `mock-pokemon.js`

- Contient un tableau de 12 pokémons
- Chaque pokémon a : `id`, `name`, `hp`, `cp`, `picture`, `types`, `created`
- Utilisé comme base de données temporaire

---

## 🔧 Configuration

### Port du serveur

- **Port :** 3000
- **URL :** http://localhost:3000

### Format des logs (Morgan)

- **Mode :** `dev` (avec couleurs)
- Affiche : méthode, URL, statut, temps de réponse, taille

---

## 📊 Résumé

| Package       | Version | Type | Utilité                  |
| ------------- | ------- | ---- | ------------------------ |
| express       | ^4.18.2 | Prod | Framework web & API REST |
| serve-favicon | ^2.5.1  | Prod | Servir le favicon        |
| morgan        | ^1.10.1 | Dev  | Logger HTTP              |
| nodemon       | ^3.1.10 | Dev  | Rechargement automatique |

---

**Date de création :** 21 Octobre 2025  
**Auteur :** Achraf  
**Version du projet :** 1.0.0
