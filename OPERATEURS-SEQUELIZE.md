# 🔍 Opérateurs Sequelize - Guide Complet

Ce document liste tous les opérateurs Sequelize pour effectuer des requêtes avancées sur la base de données.

---

## 📦 Import des Opérateurs

```javascript
const { Op } = require("sequelize");
```

---

## 🎯 Opérateurs de Comparaison

### Supérieur à (`>`)

```javascript
// Trouver les pokémons avec hp > 50
Pokemon.findAll({
  where: {
    hp: {
      [Op.gt]: 50, // gt = greater than
    },
  },
});
```

**SQL généré :** `WHERE hp > 50`

---

### Supérieur ou égal à (`>=`)

```javascript
// Trouver les pokémons avec hp >= 50
Pokemon.findAll({
  where: {
    hp: {
      [Op.gte]: 50, // gte = greater than or equal
    },
  },
});
```

**SQL généré :** `WHERE hp >= 50`

---

### Inférieur à (`<`)

```javascript
// Trouver les pokémons avec cp < 10
Pokemon.findAll({
  where: {
    cp: {
      [Op.lt]: 10, // lt = less than
    },
  },
});
```

**SQL généré :** `WHERE cp < 10`

---

### Inférieur ou égal à (`<=`)

```javascript
// Trouver les pokémons avec cp <= 10
Pokemon.findAll({
  where: {
    cp: {
      [Op.lte]: 10, // lte = less than or equal
    },
  },
});
```

**SQL généré :** `WHERE cp <= 10`

---

### Égal à (`=`)

```javascript
// Méthode 1 : Par défaut (sans opérateur)
Pokemon.findAll({
  where: {
    hp: 50,
  },
});

// Méthode 2 : Avec opérateur explicite
Pokemon.findAll({
  where: {
    hp: {
      [Op.eq]: 50, // eq = equal
    },
  },
});
```

**SQL généré :** `WHERE hp = 50`

---

### Différent de (`!=`)

```javascript
// Trouver les pokémons avec hp != 50
Pokemon.findAll({
  where: {
    hp: {
      [Op.ne]: 50, // ne = not equal
    },
  },
});
```

**SQL généré :** `WHERE hp != 50`

---

## 🔢 Opérateurs de Plage

### Entre deux valeurs (`BETWEEN`)

```javascript
// Trouver les pokémons avec hp entre 50 et 100
Pokemon.findAll({
  where: {
    hp: {
      [Op.between]: [50, 100],
    },
  },
});
```

**SQL généré :** `WHERE hp BETWEEN 50 AND 100`

---

### Pas entre deux valeurs (`NOT BETWEEN`)

```javascript
// Trouver les pokémons avec hp PAS entre 50 et 100
Pokemon.findAll({
  where: {
    hp: {
      [Op.notBetween]: [50, 100],
    },
  },
});
```

**SQL généré :** `WHERE hp NOT BETWEEN 50 AND 100`

---

## 📋 Opérateurs de Liste

### Dans une liste (`IN`)

```javascript
// Trouver les pokémons avec id = 1, 2 ou 3
Pokemon.findAll({
  where: {
    id: {
      [Op.in]: [1, 2, 3],
    },
  },
});

// Exemple avec noms
Pokemon.findAll({
  where: {
    name: {
      [Op.in]: ["Pikachu", "Bulbizarre", "Carapuce"],
    },
  },
});
```

**SQL généré :** `WHERE id IN (1, 2, 3)`

---

### Pas dans une liste (`NOT IN`)

```javascript
// Trouver les pokémons avec id différent de 1, 2 et 3
Pokemon.findAll({
  where: {
    id: {
      [Op.notIn]: [1, 2, 3],
    },
  },
});
```

**SQL généré :** `WHERE id NOT IN (1, 2, 3)`

---

## 🔤 Opérateurs de Texte (LIKE)

### Contient (`LIKE`)

```javascript
// Trouver les pokémons dont le nom contient "chu"
Pokemon.findAll({
  where: {
    name: {
      [Op.like]: "%chu%", // % = n'importe quel caractère
    },
  },
});

// Commence par "Pika"
Pokemon.findAll({
  where: {
    name: {
      [Op.like]: "Pika%",
    },
  },
});

// Se termine par "chu"
Pokemon.findAll({
  where: {
    name: {
      [Op.like]: "%chu",
    },
  },
});
```

**SQL généré :** `WHERE name LIKE '%chu%'`

---

### Ne contient pas (`NOT LIKE`)

```javascript
// Trouver les pokémons dont le nom NE contient PAS "chu"
Pokemon.findAll({
  where: {
    name: {
      [Op.notLike]: "%chu%",
    },
  },
});
```

**SQL généré :** `WHERE name NOT LIKE '%chu%'`

---

### Insensible à la casse (`ILIKE`) - PostgreSQL uniquement

```javascript
// Recherche insensible à la casse (PostgreSQL)
Pokemon.findAll({
  where: {
    name: {
      [Op.iLike]: "%pikachu%", // Trouve "Pikachu", "PIKACHU", "pikachu"
    },
  },
});
```

**SQL généré :** `WHERE name ILIKE '%pikachu%'`

> **Note :** Pour MariaDB/MySQL, `LIKE` est déjà insensible à la casse par défaut.

---

## ⚡ Opérateurs NULL

### Est NULL (`IS NULL`)

```javascript
// Trouver les pokémons sans hp défini
Pokemon.findAll({
  where: {
    hp: {
      [Op.is]: null,
    },
  },
});
```

**SQL généré :** `WHERE hp IS NULL`

---

### N'est pas NULL (`IS NOT NULL`)

```javascript
// Trouver les pokémons avec hp défini
Pokemon.findAll({
  where: {
    hp: {
      [Op.not]: null,
    },
  },
});
```

**SQL généré :** `WHERE hp IS NOT NULL`

---

## 🔗 Opérateurs Logiques

### ET (`AND`) - Par défaut

```javascript
// Trouver les pokémons avec hp > 50 ET cp < 100
Pokemon.findAll({
  where: {
    hp: { [Op.gt]: 50 },
    cp: { [Op.lt]: 100 },
  },
});

// Avec opérateur explicite
Pokemon.findAll({
  where: {
    [Op.and]: [{ hp: { [Op.gt]: 50 } }, { cp: { [Op.lt]: 100 } }],
  },
});
```

**SQL généré :** `WHERE hp > 50 AND cp < 100`

---

### OU (`OR`)

```javascript
// Trouver les pokémons avec hp > 100 OU cp > 50
Pokemon.findAll({
  where: {
    [Op.or]: [{ hp: { [Op.gt]: 100 } }, { cp: { [Op.gt]: 50 } }],
  },
});
```

**SQL généré :** `WHERE hp > 100 OR cp > 50`

---

### Combinaisons Complexes

```javascript
// (hp >= 50 AND cp < 100) OR (name LIKE '%chu%')
Pokemon.findAll({
  where: {
    [Op.or]: [
      {
        [Op.and]: [{ hp: { [Op.gte]: 50 } }, { cp: { [Op.lt]: 100 } }],
      },
      { name: { [Op.like]: "%chu%" } },
    ],
  },
});
```

**SQL généré :** `WHERE (hp >= 50 AND cp < 100) OR name LIKE '%chu%'`

---

## 📊 Tableau Récapitulatif

| Opérateur       | Symbole       | Description           | Exemple SQL                 |
| --------------- | ------------- | --------------------- | --------------------------- |
| `Op.gt`         | `>`           | Supérieur à           | `hp > 50`                   |
| `Op.gte`        | `>=`          | Supérieur ou égal à   | `hp >= 50`                  |
| `Op.lt`         | `<`           | Inférieur à           | `cp < 10`                   |
| `Op.lte`        | `<=`          | Inférieur ou égal à   | `cp <= 10`                  |
| `Op.eq`         | `=`           | Égal à                | `id = 1`                    |
| `Op.ne`         | `!=`          | Différent de          | `hp != 50`                  |
| `Op.between`    | `BETWEEN`     | Entre deux valeurs    | `hp BETWEEN 50 AND 100`     |
| `Op.notBetween` | `NOT BETWEEN` | Pas entre             | `hp NOT BETWEEN 50 AND 100` |
| `Op.in`         | `IN`          | Dans une liste        | `id IN (1, 2, 3)`           |
| `Op.notIn`      | `NOT IN`      | Pas dans une liste    | `id NOT IN (1, 2, 3)`       |
| `Op.like`       | `LIKE`        | Contient              | `name LIKE '%chu%'`         |
| `Op.notLike`    | `NOT LIKE`    | Ne contient pas       | `name NOT LIKE '%chu%'`     |
| `Op.iLike`      | `ILIKE`       | Contient (insensible) | `name ILIKE '%pikachu%'`    |
| `Op.is`         | `IS`          | Est NULL              | `hp IS NULL`                |
| `Op.not`        | `IS NOT`      | N'est pas NULL        | `hp IS NOT NULL`            |
| `Op.and`        | `AND`         | Et logique            | `hp > 50 AND cp < 100`      |
| `Op.or`         | `OR`          | Ou logique            | `hp > 100 OR cp > 50`       |

---

## 🎯 Exemples Pratiques pour l'API Pokémon

### Filtrer par plage de HP

```javascript
app.get("/api/pokemons", (req, res) => {
  const { minHp, maxHp } = req.query;

  if (minHp && maxHp) {
    return Pokemon.findAll({
      where: {
        hp: {
          [Op.between]: [parseInt(minHp), parseInt(maxHp)],
        },
      },
      order: [["hp", "ASC"]],
    }).then((pokemons) => {
      const message = `${pokemons.length} pokémons avec hp entre ${minHp} et ${maxHp}`;
      res.json({ message, data: pokemons });
    });
  }
});
```

**Utilisation :** `GET /api/pokemons?minHp=50&maxHp=100`

---

### Filtrer par HP minimum

```javascript
app.get("/api/pokemons/strong", (req, res) => {
  Pokemon.findAll({
    where: {
      hp: {
        [Op.gte]: 50, // hp >= 50
      },
    },
    order: [["hp", "DESC"]],
  }).then((pokemons) => {
    const message = `${pokemons.length} pokémons forts (hp >= 50)`;
    res.json({ message, data: pokemons });
  });
});
```

**Utilisation :** `GET /api/pokemons/strong`

---

### Recherche multiple (nom OU type)

```javascript
app.get("/api/pokemons/search", (req, res) => {
  const { term } = req.query;

  Pokemon.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${term}%` } },
        { types: { [Op.like]: `%${term}%` } },
      ],
    },
  }).then((pokemons) => {
    const message = `${pokemons.length} résultats pour "${term}"`;
    res.json({ message, data: pokemons });
  });
});
```

**Utilisation :** `GET /api/pokemons/search?term=feu`

---

### Filtrer par liste d'IDs

```javascript
app.get("/api/pokemons/batch", (req, res) => {
  const ids = req.query.ids.split(",").map((id) => parseInt(id));

  Pokemon.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  }).then((pokemons) => {
    const message = `${pokemons.length} pokémons trouvés`;
    res.json({ message, data: pokemons });
  });
});
```

**Utilisation :** `GET /api/pokemons/batch?ids=1,2,3,5,8`

---

### Pokémons équilibrés (HP et CP similaires)

```javascript
app.get("/api/pokemons/balanced", (req, res) => {
  Pokemon.findAll({
    where: {
      [Op.and]: [
        { hp: { [Op.between]: [20, 30] } },
        { cp: { [Op.between]: [5, 10] } },
      ],
    },
    order: [["name", "ASC"]],
  }).then((pokemons) => {
    const message = `${pokemons.length} pokémons équilibrés`;
    res.json({ message, data: pokemons });
  });
});
```

**Utilisation :** `GET /api/pokemons/balanced`

---

## 🔥 Astuces et Bonnes Pratiques

### 1. Validation des entrées utilisateur

```javascript
// ❌ Mauvais : injection possible
const name = req.query.name;
Pokemon.findAll({
  where: sequelize.literal(`name LIKE '%${name}%'`), // DANGER !
});

// ✅ Bon : utiliser les opérateurs Sequelize
const name = req.query.name;
Pokemon.findAll({
  where: {
    name: { [Op.like]: `%${name}%` }, // Sécurisé
  },
});
```

---

### 2. Conversion des types

```javascript
// Toujours convertir les query params en nombres
const minHp = parseInt(req.query.minHp) || 0;
const maxHp = parseInt(req.query.maxHp) || 999;

Pokemon.findAll({
  where: {
    hp: { [Op.between]: [minHp, maxHp] },
  },
});
```

---

### 3. Gestion des valeurs nulles

```javascript
// Vérifier si un champ est défini OU null
const hp = req.query.hp;

if (hp === "null") {
  // Chercher les pokémons sans HP
  where.hp = { [Op.is]: null };
} else if (hp) {
  // Chercher les pokémons avec HP spécifique
  where.hp = parseInt(hp);
}
```

---

### 4. Combiner avec limit, offset, order

```javascript
Pokemon.findAll({
  where: {
    hp: { [Op.gt]: 50 },
  },
  order: [["hp", "DESC"]],
  limit: 10,
  offset: 0,
});
```

---

## 📚 Ressources Supplémentaires

- [Documentation officielle Sequelize - Querying](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- [Documentation officielle Sequelize - Operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

---

**Date de création :** 27 Octobre 2025  
**Auteur :** Achraf  
**Projet :** Pokémon API REST avec Sequelize
