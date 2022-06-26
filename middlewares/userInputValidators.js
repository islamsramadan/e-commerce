const { body, param } = require("express-validator");

// User Validations
module.exports.onLogin = [
  body("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email format"),

  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({min:8,max:12})
    .withMessage("Password length must be between 8:12 characters")
];
