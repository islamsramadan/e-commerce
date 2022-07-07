const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
      // reauired: true,
    },
    // adminId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "admin",
    // },
    comRegImgLink: String, // Commercial Register image link
    verifyTime: Date,
    // required: true,
  },
  {
    _id: false,
    timestamps: true,
  }
);

const businessSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  verification: {
    type: verificationSchema,
    // required: true,
  },
  description: String,
});

mongoose.model("business", businessSchema);
