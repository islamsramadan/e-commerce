const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/product-count', adminController.getNumberOfProduct);
router.get('/users-count', adminController.getNumberOfUsers);
router.get('/order-count', adminController.getTotalOrders);

module.exports = router;
