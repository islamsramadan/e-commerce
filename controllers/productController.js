require("../models/product");

const mongoose = require("mongoose");

let Products = mongoose.model("product");

module.exports.getAllProducts = (req, res, next) => {
  Products.find({})
    .then((data) => {
      res.status(200).json({ status: "success", data });
    })
    .catch((error) => next(error));
};

module.exports.addProduct = (req, res, next) => {
  if (req.role === "admin" || req.role === "business") {
    let newProduct = new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      // imageLink: req.body.image,
      businessId: req.body.businessId,
      category: req.body.category,
    });
    newProduct
      .save()
      .then((data) => {
        res.status(201).json({ status: "success", message: "product added" });
      })
      .catch((err) => next(err));
  }
};

module.exports.updateProduct = (req, res, next) => {
  if (
    req.role === "admin" ||
    (req.role === "business" && req.id == req.body.id)
  ) {
    Products.findOne({ _id: req.body.id })
      .then((data) => {
        for (prop in req.body) {
          data[prop] = req.body[prop];
        }
        return data.save().then((data) => {
          res.status(200).json({
            status: "success",
            message: "product updated",
          });
        });
      })
      .catch((err) => next(err));
  }
};

module.exports.getOneProduct = (req, res, next) => {
  Products.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({ status: "success", data });
    })
    .catch((err) => next(err));
};

module.exports.deleteOneProduct = (req, res, next) => {
  console.log(req.role);

  if (
    req.role === "admin" ||
    (req.role === "business" && req.id == req.params.id)
  ) {
    Products.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({ status: "success", message: "product deleted" });
      })
      .catch((err) => next(err));
  }
};
