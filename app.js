const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello again World !");
});
app.get("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  res.send("You requested the pokemon with id: " + id);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
