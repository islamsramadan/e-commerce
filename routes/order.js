const express = require("express")
const router = express.Router();

const orderController = require("../controllers/order-paymentController")

router.route("/orders").get(orderController.getOrders)
router.route("/myorders/:id").get(orderController.getMyOrder)
router.route("/orders").post(orderController.addOrders)
router.route('/getSingleOrder/:id').get(orderController.getOrderById)
router.route('/:id/pay').put(orderController.updateOrderToPaid)
router.route('/:id/deliver').put(orderController.updateOrderToDelivered)

module.exports = router