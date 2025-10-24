const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { success, getUniqueId } = require("./helpers");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemon");
const pokemon = require("./src/models/pokemon");

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("la connexion a la base de donné a bien eté etablie.");
  })
  .catch((err) => {
    console.error("la connexion a la base de donné a echoué:", err);
  });
const Pokemon = PokemonModel(sequelize, DataTypes);
sequelize.sync({ force: true }).then(() => {
  console.log("La base de donnée a été synchronisée.");
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(),
    }).then((pokemon) => console.log(pokemon.toJSON()));
  });
  Pokemon.create({
    name: "Bulbizarre",
    hp: 100,
    cp: 10,
    picture:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    types: "Plante,Poison",
  }).then((pokemon) => console.log(pokemon.toJSON()));
});

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello again World !");
});
app.get("/api/pokemons", (req, res) => {
  const count = pokemons.length;
  const message = "La liste des pokémons a été récupérée avec succès.";
  res.json(success(message, pokemons));
});
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = "Un pokémon a été trouvé.";
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.json(success(message, pokemon));
});
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
