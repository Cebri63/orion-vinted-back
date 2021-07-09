const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    // Récupérer le token envoyé depuis le client
    const token = req.headers.authorization.replace("Bearer ", "");
    // Chercher le user qui possède ce token
    const user = await User.findOne({ token: token }).select("account");
    // Si on le trouve ===> next()
    if (user) {
      req.user = user;
      next();
    } else {
      // Sinon ==> "Unauthorized"
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
