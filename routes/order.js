const express = require("express")
const router = express.Router();

const orderController = require("../controllers/order-paymentController")

router.route("/orders", orderController.getOrders)
router.route('/getSingleOrder/:id').get(orderController.getOrderById)
router.route('/:id/pay').put(orderController.updateOrderToPaid)
router.route('/:id/deliver').put(orderController.updateOrderToDelivered)