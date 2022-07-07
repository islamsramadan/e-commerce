const mongoose = require("mongoose");

const {nameSchema} = require('./common')

const productsSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: false
    },
    quantity: {
      type: Number,
      required: false
    },
  },
  { _id: false }
);

const cartSchema = mongoose.Schema(
  {
    products: [{
      type: productsSchema,
      required: false
    }],
    totalPrice: {
      type: Number,
      default: 0,
      required: false
    },
  },
  { _id: false }
);

const customerSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    unique: true,
    required: true
  },
  name: {
    type: nameSchema,
    required: true
  },
  cart: {
    type: cartSchema,
    required: true
  },
});

module.exports = mongoose.model("customer", customerSchema);
