const express = require('express');
const controller = require('../controllers/customerController');
const router = express.Router();
const { body, param } = require('express-validator');
const validationMW = require('../middlewares/validationMW');
const authMW = require('../middlewares/isAuthenticated');

router
  .route('/customers/cart')
  .get(authMW, controller.getCart)
  .post(
    authMW,
    [
      body('productId')
        .isMongoId()
        .withMessage('Product id should be a valid MongoID.'),
      body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity should be a number above 0'),
    ],
    validationMW,
    controller.addToCart
  )
  .delete(
    authMW,
    [
      body('productId')
        .isMongoId()
        .withMessage('Product id should be a valid MongoID.'),
    ],
    validationMW,
    controller.removeFromCart
  );

router.put(
  '/customers/cart/increment',
  authMW,
  [
    body('productId')
      .isMongoId()
      .withMessage('Product id should be a valid MongoID.'),
  ],
  validationMW,
  controller.incrementProductInCart
);

router.put(
  '/customers/cart/decrement',
  authMW,
  [
    body('productId')
      .isMongoId()
      .withMessage('Product id should be a valid MongoID.'),
  ],
  validationMW,
  controller.decrementProductInCart
);
router.put('/update-customer/', authMW,controller.updateCustomer);
module.exports = router;
