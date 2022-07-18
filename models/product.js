const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    // required: true,
  },
  businessId: {
    type: mongoose.Types.ObjectId,
    ref: "business",
    // required:true,
  },
  imageLink: String,
});

module.exports = mongoose.model("product", productSchema);
