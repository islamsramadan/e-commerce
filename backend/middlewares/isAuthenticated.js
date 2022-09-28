const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  let decodedToken = null;
  try {
    let token = req.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Unauthorized Operation!");
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.role = decodedToken.role;
    req.id = decodedToken.id;
    const user = await User.findById(req.id);
    req.user = user;
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
