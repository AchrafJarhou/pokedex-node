const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message =
            "L'utilisateur demandé n'existe pas. Vérifiez le nom d'utilisateur.";
          return res.status(404).json({ message });
        }
        return bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `le mot de passe est incorrect. Veuillez réessayer.`;
              return res.status(401).json({ message });
            }

            // Générer le token JWT
            const token = jwt.sign(
              { userId: user.id, username: user.username },
              privateKey,
              { expiresIn: "24h" }
            );
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message =
          "Une erreur est survenue lors de la tentative de connexion.";
        res.status(500).json({ message, data: error });
      });
  });
};
