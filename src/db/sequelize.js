/* L'API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    // Initialiser seulement si la table est vide
    Pokemon.count().then((count) => {
      if (count === 0) {
        pokemons.map((pokemon) => {
          Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types,
          }).then((pokemon) => console.log(pokemon.toJSON()));
        });
        console.log("La base de donnée a bien été initialisée !");
      } else {
        console.log(`La base de données contient déjà ${count} pokémons.`);
      }
    });

    User.count().then((count) => {
      if (count === 0) {
        bcrypt.hash("pikatchu", 10).then((hash) => {
          User.create({
            username: "pikatchu",
            password: hash,
          }).then((user) => console.log(user.toJSON()));
        });
      }
    });
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
