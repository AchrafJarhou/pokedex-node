const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête Authorization.`;
    return res.status(401).json({ message });
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (!token || !/^Bearer$/i.test(scheme)) {
    const message = `Format du jeton invalide. Utilisez: Authorization: Bearer <token>.`;
    return res.status(401).json({ message });
  }

  try {
    // Vérifier le token JWT et le décoder
    const decoded = jwt.verify(token, privateKey);
    // Attacher l'utilisateur au contexte de la requête pour un usage ultérieur
    req.user = { id: decoded.userId, username: decoded.username };

    // Optionnel: si une route exige que req.body.userId corresponde au token
    if (req.body && req.body.userId && req.body.userId !== decoded.userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message });
    }

    return next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
    return res.status(401).json({ message, data: error });
  }
};
