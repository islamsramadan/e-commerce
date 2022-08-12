const mongoose = require("mongoose");
const business = require("../models/business");
require("../models/customer");
require("../models/product");
const Customer = mongoose.model("customer");
const Product = mongoose.model("product");

module.exports.addToCart = async (req, res, next) => {
  try {
    const customer = await Customer.findOne(
      { userId: req.id },
      {
        cart: 1,
      }
    );

    const product = await Product.findById(req.body.productId, {
      price: 1,
      quantity: 1,
    });

    if (!product)
      return next(new Error("Couldn't find a product with that id."));

    const { price: productPrice, quantity: productQuantity } = product;

    if (productQuantity < req.body.quantity)
      return next(new Error(`Item quantity in stock: ${productQuantity}`));

    const cart = customer.cart;

    const addedProduct = {
      productId: req.body.productId,
      quantity: req.body.quantity,
    };

    const duplicateProductIndex = cart.products.findIndex(
      (product) => product.productId == addedProduct.productId
    );

    if (duplicateProductIndex >= 0) {
      if (
        productQuantity <
        req.body.quantity + cart.products[duplicateProductIndex].quantity
      )
        return next(
          new Error(`Max item quantity in stock is : ${productQuantity}`)
        );

      cart.products[duplicateProductIndex].quantity += addedProduct.quantity;
    } else {
      cart.products.push(addedProduct);
    }

    cart.totalPrice = (
      cart.totalPrice +
      productPrice * req.body.quantity
    ).toFixed(2);

    customer.cart = cart;

    await customer.save();
    res.status(201).json({
      success: true,
      message: "Product(s) added to cart successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.removeFromCart = async (req, res, next) => {
  const customer = await Customer.findOne(
    { userId: req.id },
    {
      cart: 1,
    }
  );

  try {
    const product = await Product.findById(req.body.productId, {
      price: 1,
      quantity: 1,
    });

    if (!product)
      return next(new Error("Couldn't find a product with that id."));

    const { price: productPrice } = product;
    const cart = customer.cart;

    const removedProductIndex = cart.products.findIndex(
      (product) => product.productId == req.body.productId
    );

    if (removedProductIndex === -1)
      return next(new Error("Couldn't find this product in the cart"));

    cart.totalPrice = (
      cart.totalPrice -
      productPrice * cart.products[removedProductIndex].quantity
    ).toFixed(2);

    cart.products.splice(removedProductIndex, 1);

    customer.cart = cart;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Product(s) removed from cart successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.incrementProductInCart = async (req, res, next) => {
  try {
    const customer = await Customer.findOne(
      { userId: req.id },
      {
        cart: 1,
      }
    );

    const product = await Product.findById(req.body.productId, {
      price: 1,
      countInStock: 1,
    });

    if (!product)
      return next(new Error("Couldn't find a product with that id."));

    const { price: productPrice, countInStock: productQuantity } = product;

    const cart = customer.cart;

    const productInCartIndex = cart.products.findIndex(
      (product) => product.productId == req.body.productId
    );

    if (productInCartIndex === -1)
      return next(new Error("Cannot increment, product is not in cart"));

    if (productQuantity < cart.products[productInCartIndex].quantity + 1)
      return next(
        new Error(
          `Cannot increment, product max quantity in stock is ${productQuantity}`
        )
      );

    cart.products[productInCartIndex].quantity++;
    cart.totalPrice = (cart.totalPrice + productPrice).toFixed(2);

    customer.cart = cart;

    await customer.save();
    res.status(200).json({
      success: true,
      message: "Product incremented successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.decrementProductInCart = async (req, res, next) => {
  try {
    const customer = await Customer.findOne(
      { userId: req.id },
      {
        cart: 1,
      }
    );

    if (!customer)
      return next(new Error("Couldn't find a customer with that id."));

    const product = await Product.findById(req.body.productId, {
      price: 1,
    });

    if (!product)
      return next(new Error("Couldn't find a product with that id."));

    const { price: productPrice } = product;

    const cart = customer.cart;

    const productInCartIndex = cart.products.findIndex(
      (product) => product.productId == req.body.productId
    );

    if (productInCartIndex === -1)
      return next(new Error("Cannot decrement, product is not in cart"));

    if (cart.products[productInCartIndex].quantity == 1)
      return next(
        new Error(
          `Cannot decrement less than 1, you can remove the item instead`
        )
      );

    cart.products[productInCartIndex].quantity--;
    cart.totalPrice = (cart.totalPrice - productPrice).toFixed(2);

    customer.cart = cart;

    await customer.save();
    res.status(200).json({
      success: true,
      message: "Product decremented successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getAllCustomers = (req, res, next) => {
  Customer.find({})
    .populate({ path: "userId", select: { email: 1 } })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    });
};

module.exports.getCustomersById = (req, res, next) => {
  Customer.findById({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Customer.findOne(
      { userId: req.user.id },
      { cart: 1 }
    ).populate({
      path: "cart.products.productId",
      populate: { path: "businessId", model: "business" },
    });

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCustomer = (req, res, next) => {
  const customerId = req.user._id.toString();

  Customer.findOne({ userId: customerId })
    .then((data) => {
      console.log(data);
      console.log(customerId);
      for (const property in req.body) {
        switch (property) {
          case "firstname":
            data.name.firstname = req.body[property];
            break;
          case "lastname":
            data.name.lastname = req.body[property];
            break;
          default:
            data[property] = req.body[property];
            break;
        }
      }
      return data
        .save()
        .then((data) => res.status(200).json({ message: "updated", data }));
    })
    .catch((error) => {
      next(error);
    });
};
