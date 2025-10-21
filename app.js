const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello again World !");
});
app.get("/api/pokemons/1", (req, res) => {
  res.send("hello pikachu");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
