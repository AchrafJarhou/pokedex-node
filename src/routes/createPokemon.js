// recupérer le modèle Pokemon
const { Pokemon } = require("../db/sequelize");
// exporter une fonction qui prend l'application Express en paramètre qui permet d'jouter une route POST pour créer un nouveau Pokémon

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body).then((pokemon) => {
      const message = `Le pokémon ${req.body.name} a bien été crée.`;
      res.json({ message, data: pokemon });
    });
  });
};
