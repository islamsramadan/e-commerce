const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/product-count', adminController.getNumberOfProduct);
router.get('/users-count', adminController.getNumberOfUsers);
router.get('/order-count', adminController.getTotalOrders);
router.get('/customer-data/:id', adminController.getCustomerData);
router.post('/add-admin/', adminController.addAdmin);

module.exports = router;
