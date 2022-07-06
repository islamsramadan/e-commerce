const mongoose = require("mongoose");
require("../models/customer");
require("../models/product");
const Customer = mongoose.model("customer");
const Product = mongoose.model("product");

module.exports.addToCart = async (req, res, next) => {
  const customer = await Customer.findById(req.params.id, {
    cart: 1,
  });

  if (!customer)
    return next(new Error("Couldn't find a customer with that id."));

  try {
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
      cart.products[duplicateProductIndex].quantity += addedProduct.quantity;
    } else {
      cart.products.push(addedProduct);
    }

    cart.totalPrice += productPrice * req.body.quantity;

    product.quantity -= req.body.quantity;
    customer.cart = cart;

    await product.save();
    await customer.save();
    res.status(201).json({
      success: true,
      message: "Product(s) added to cart successfully!",
    });
  } catch (e) {
    next(e);
  }
};
