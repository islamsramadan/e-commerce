const mongoose = require('mongoose');
require('../models/product');
require('../models/user');
require('../models/customer');
require('../models/order');
require('../models/common');
require('../models/admin');
const orders = mongoose.model('orders');
const Products = mongoose.model('product');
const User = mongoose.model('user');
const Customer = mongoose.model('customer');
const Admin = mongoose.model('admin');

module.exports.getNumberOfProduct = async (req, res) => {
  const numOfProductInStoct = await Products.count({
    countInStock: { $gte: 0 },
  });
  const numofSolded = await Products.count({ countInStock: { $lte: 1 } });
  const numofAllProducts = await Products.count({});
  res.json({
    numofAllProducts: numofAllProducts,
    productCount: numOfProductInStoct,
    numofSolded: numofSolded,
  });
};

module.exports.getNumberOfUsers = async (req, res) => {
  const numOfCustomers = await User.count({
    role: 'customer',
  });
  const numOfbusiness = await User.count({
    role: 'business',
  });
  const numOfUsers = await User.count({});
  res.json({
    numOfUsers: numOfUsers,
    numOfCustomers: numOfCustomers,
    numOfbusiness: numOfbusiness,
  });
};

module.exports.getTotalOrders = async (req, res) => {
  const numOfDelivered = await orders.count({
    status: 'Delivered',
  });
  const numOfOnDelivery = await orders.count({
    status: 'order',
  });
  const totalNumofOrders = await orders.count({});
  res.json({
    totalNumofOrders: totalNumofOrders,
    numOfOnDelivery: numOfOnDelivery,
    numOfDelivered: numOfDelivered,
  });
};

module.exports.getCustomerData = async (req, res, next) => {
  try {
    const data = await orders
      .findOne({ userId: req.params.id }, { status: 1 })
      .populate({
        path: 'orderItems.productId',
        select: 'name reviews',
      })
      .populate({ path: 'userId', select: ' email isVerified phone address' });

    const fullName = await Customer.findOne({ userId: req.params.id }, {});
    res.status(200).json({ data: data, fullName: fullName });
  } catch (error) {
    next(error);
  }
};

module.exports.addAdmin = (req, res, next) => {
  let admin = new Admin({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  admin
    .save()
    .then((data) => {
      res.status(200).json({ data: 'added', data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteAdmin = (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.isDeleted = true;
    const updatedadmin = await admin.save();
    res.json(updatedadmin);
  } else {
    res.status(404);
    throw new Error('admin not found');
  }
};
