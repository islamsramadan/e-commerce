const mongoose = require("mongoose");
require("../models/order");
const orders = mongoose.model("orders");
const Customer = mongoose.model("customer");
const business = mongoose.model("business");

module.exports.getOrders = (req, res, next) => {
  orders
    .find()
    .populate({ path: "userId" })
    .populate({
      path: "orderItems",
      populate: { path: "productId", model: "product" },
    })
    .populate({
      path: "orderItems",
      populate: { path: "businessId", model: "user" },
    })

    //{name:1,email:1}
    .then((data) => {
      console.log();
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getOrderById = async (req, res, next) => {
  const order = await orders
    .findById(req.params.id)
    .populate({ path: "userId", select: { email: 1, _id: 0 } });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
  // orders.find({_id:req.params.id}).then(data=>{
  //     if(data==null) next(new Error(" orders not found"))
  //     res.status(200).json(data);
  // }).catch(err=>next(err))
};

module.exports.addOrders = async (req, res, next) => {
  console.log("------>", req.body.cartItems[0].productId.businessId._id);
  try {
    const address = {
      city: req.body.city,
      street: req.body.street,
      building: req.body.building,
      floor: req.body.floor,
    };

    const orderItems = [];
    for (let obj of req.body.cartItems) {
      console.log("obj", obj);
      orderItems.push({
        productId: obj.productId._id,
        businessId: obj.productId.businessId._id,
        name: obj.productId.name,
        quantity: obj.quantity,
      });
    }

    const order = new orders({
      userId: req.body.userId,
      paymentMethod: req.body.paymentMethod,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      address,
      orderItems,
    });

    const customer = await Customer.findOne({ userId: req.body.userId });
    customer.cart = {};
    await order.save();
    await customer.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.updateOrderToPaid = async (req, res) => {
  const order = await orders.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};
module.exports.updateOrderToDelivered = async (req, res, next) => {
  const order = await orders.findById(req.params.id);
  const BusinessId = order.orderItems[0].businessId.toString();

  if (order) {
    order.status = "Delivered";
    order.deliveredAt = Date.now();
    order.save();
    res.status(200).json(order);
    const Business = await business.findOne({ userId: BusinessId });
    if (Business) {
      Business.balance = order.totalPrice - order.totalPrice * 0.15;
      return Business.save();
    } else {
      res.status(404);
      throw new Error("Business not found");
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};
module.exports.getCustomerOrder = (req, res, next) => {
  orders
    .find({ userId: req.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};
