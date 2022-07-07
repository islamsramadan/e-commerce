const mongoose = require("mongoose");
require("../models/user");
require("../models/customer");
require("../models/business");

const User = mongoose.model("user");
const Customer = mongoose.model("customer");
const Business = mongoose.model("business");

module.exports.updateUser = async (req, res, next) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdates = [
    "email",
    "city",
    "street",
    "building",
    "floor",
    "phone",
    "isVerified",
  ];

  const isValidUpdate = updateFields.every((updateField) =>
    allowedUpdates.includes(updateField)
  );

  if (!isValidUpdate) return next(new Error("Invalid update field(s)."));
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new Error("Couldn't find a user with that id."));

    const address = ["city", "street", "building", "floor"];

    updateFields.forEach((updateField) => {
      if (address.includes(updateField)) {
        user.address[updateField] = req.body[updateField];
      } else {
        user[updateField] = req.body[updateField];
      }
    });
    await user.save();
    res.status(200).json({ success: true, message: "Updated Successfully!" });
  } catch (e) {
    next(e);
  }
};

module.exports.removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new Error("Couldn't find a user with that id."));

    switch (user.role) {
      case "customer":
        await Customer.findOneAndDelete({ userId: req.params.id });
        break;
      case "business":
        await Business.findOneAndDelete({ userId: req.params.id });
        break;
    }
    res.status(200).json({ success: true, message: "Deleted Successfully!" });
  } catch (e) {
    next(e);
  }
};
