const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decodedToken = null;
  try {
    let token = req.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Unauthorized Operation!");
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.role = decodedToken.role;
    req.id = decodedToken.id;
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
