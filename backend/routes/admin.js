const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { getBusinessStatistics } = require("../controllers/business");

const isAdmin = require("../middlewares/isAdmin");

router.get("/product-count", adminController.getNumberOfProduct);
router.get("/users-count", adminController.getNumberOfUsers);
router.get("/order-count", adminController.getTotalOrders);
router.get("/customer-data/:id", adminController.getCustomerData);
router.post("/add-admin/", adminController.signup);
router.delete("/delete-admin", isAdmin, adminController.deleteAdmin);
router.post("/adminLogin", adminController.adminLogin);
router.get("/getStatistics", adminController.getStatistics);
router.get("/getStatistics-business/:id", getBusinessStatistics);

module.exports = router;
