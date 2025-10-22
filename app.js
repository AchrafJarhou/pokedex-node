const express = require("express");
const { success } = require("./helpers");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
