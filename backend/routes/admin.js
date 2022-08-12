const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdmin');

router.get('/product-count', adminController.getNumberOfProduct);
router.get('/users-count', adminController.getNumberOfUsers);
router.get('/order-count', adminController.getTotalOrders);
router.get('/customer-data/:id', adminController.getCustomerData);
router.post('/add-admin/', isAdmin, adminController.signup);
router.delete('/delete-admin', isAdmin, adminController.deleteAdmin);
router.get('/adminLogin', adminController.adminLogin);
router.get('/getStatistics', adminController.getStatistics);

module.exports = router;
