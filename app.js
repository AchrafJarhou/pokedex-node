const express = require("express");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello again World !");
});
app.get("/api/pokemons", (req, res) => {
  const count = pokemons.length;
  res.json({ data: pokemons, count: count });
});
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.json(pokemon);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
