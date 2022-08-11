const mongoose = require('mongoose');
require('../models/product');
require('../models/user');
require('../models/customer');
require('../models/order');
require('../models/common');
require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const name = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  try {
    if (req.admin.isHead === true) {
      Admin.findOne({ email: email }).then((user) => {
        if (user) {
          // email already exist in database
          return res.status(401).json({
            success: false,
            message: 'this email exist on our data',
          });
        } else {
          // hashing password and save data in USER collection
          bcrypt.hash(password, 10).then((hashedPassword) => {
            return new Admin({
              email: email,
              password: hashedPassword,
              name: name,
            })
              .save()
              .then((userData) => {
                res.status(201).json({
                  success: true,
                  message: 'User created Successfully',
                  userId: userData,
                });
              });
          });
        }
      });
    } else {
      throw new Error('sorry you don`t have authorize');
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports.deleteAdmin = async (req, res, next) => {
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
module.exports.adminLogin = function login(req, res, next) {
  const { email, password } = req.body;

  Admin.findOne({ email: email })
    .then((admin) => {
      if (!admin) {
        // no email found
        return res.status(401).json({
          success: false,
          message: 'invalid email or password',
        });
      } else {
        bcrypt.compare(password, admin.password).then(async (isEqual) => {
          if (!isEqual) {
            // password is incorrect
            return res.status(401).json({
              success: false,
              message: 'invalid email or password',
            });
          } else {
            // successful login
            const token = jwt.sign(
              {
                id: admin._id,
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '24h' }
            );

            res.status(200).json({
              success: true,
              message: 'successful login',
              token: token,
              admin: admin,
            });
          }
        });
      }
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
