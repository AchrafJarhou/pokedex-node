const { Pokemon } = require("../db/sequelize");
// importation des operateurs de Sequelize
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        limit: 5,
      }).then((pokemons) => {
        const message = `La liste des pokémons avec le nom ${name} a bien été récupérée. ya ${pokemons.length} pokémons.`;
        res.json({ message, data: pokemons });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message =
            "La liste des pokémons a bien été récupérée. ya " +
            pokemons.length +
            " pokémons.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = "La liste des pokémons n'a pas pu être récupérée.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
