const mongoose = require("mongoose");

module.exports.nameSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
},
  { _id: false }
);

module.exports.addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: String,
    floor: String,
  },
  { _id: false }
);