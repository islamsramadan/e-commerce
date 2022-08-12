const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

module.exports = async (req, res, next) => {
  let decodedToken = null;
  try {
    let token = req.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Unauthorized Operation!");
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decodedToken.id;
    const admin = await Admin.findById(req.id);
    req.admin = admin;
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
