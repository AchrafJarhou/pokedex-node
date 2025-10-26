// recupérer le modèle Pokemon
const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
// exporter une fonction qui prend l'application Express en paramètre qui permet d'jouter une route POST pour créer un nouveau Pokémon

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        // IMPORTANT: UniqueConstraintError hérite de ValidationError.
        // Il faut donc tester UniqueConstraintError AVANT ValidationError
        // pour renvoyer le bon message personnalisé.
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({
            message: "Le nom du pokémon est déjà pris.",
            data: error,
          });
        }
        if (error instanceof ValidationError) {
          return res.status(400).json({
            message: error.message,
            data: error,
          });
        }

        const message = "Le pokémon n'a pas pu être créé.";
        res.status(500).json({ message, data: error });
      });
  });
};
