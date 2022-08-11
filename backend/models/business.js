const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: 'admin',
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
    ref: 'user',
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
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  verification: {
    type: verificationSchema,
    default: {},
  },
  description: String,
});

module.exports = mongoose.model('business', businessSchema);
