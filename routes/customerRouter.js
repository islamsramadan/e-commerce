const express = require("express");
const controller = require("../controllers/customerController");
const router = express.Router();
const { body, param } = require("express-validator");
const validationMW = require("../middlewares/validationMW");

/**HELPERS */
// const { route } = require("../e-commerce/routes/customerRouter");

router
  .route("/customers/:id/cart")
  .post(
    [
      param("id")
        .isMongoId()
        .withMessage("Customer id should be a valid MongoID."),
      body("productId")
        .isMongoId()
        .withMessage("Product id should be a valid MongoID."),
      body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity should be a number above 0"),
    ],
    validationMW,
    controller.addToCart
  )
  .delete(
    [
      param("id")
        .isMongoId()
        .withMessage("Customer id should be a valid MongoID."),
      body("productId")
        .isMongoId()
        .withMessage("Product id should be a valid MongoID."),
    ],
    validationMW,
    controller.removeFromCart
  );

router
  .route("/customers/:id/cart/increment")
  .put(
    [
      param("id")
        .isMongoId()
        .withMessage("Customer id should be a valid MongoID."),
      body("productId")
        .isMongoId()
        .withMessage("Product id should be a valid MongoID."),
    ],
    validationMW,
    controller.incrementProductInCart
  );

module.exports = router;
