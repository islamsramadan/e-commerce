const mongoose = require('mongoose');
require('../models/product');
require('../models/user');
require('../models/customer');
require('../models/business');
require('../models/order');
const orders = mongoose.model('orders');
const Products = mongoose.model('product');
const User = mongoose.model('user');

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
