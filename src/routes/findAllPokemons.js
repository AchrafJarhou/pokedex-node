const { Pokemon } = require("../db/sequelize");
// importation des operateurs de Sequelize
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const limit = parseInt(req.query.limit) || 5;
      const name = req.query.name;
      if (name.length < 2) {
        const message =
          "Le terme de recherche doit contenir au moins 2 caractères.";
        return res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({
        where: { name: { [Op.like]: `%${name}%` } },
        limit: limit,
        order: [["name", "ASC"]],
      }).then(({ count, rows }) => {
        const message = `La liste des pokémons avec le nom ${name} a bien été récupérée. ya ${count} pokémons.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
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
