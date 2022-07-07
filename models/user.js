const mongoose = require("mongoose");

const { addressSchema } = require("./common");

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "business"],
  },
  address: {
    type: addressSchema,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phone: String,
});

module.exports = mongoose.model("users", userSchema);
