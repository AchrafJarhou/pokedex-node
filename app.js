const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { success } = require("./helpers");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app.use(favicon(__dirname + "/favicon.ico")).use(morgan("dev"));
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
  const id = 123;
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
  res.json(success(message, pokemonCreated));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
