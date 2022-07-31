require("../models/product");

const mongoose = require("mongoose");

let Products = mongoose.model("product");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { match } = require("assert");

module.exports.getAllProducts = (req, res, next) => {
  Products.find({})
    .then((data) => {
      res.status(200).json({ status: "success", data });
    })
    .catch((error) => next(error));
};

module.exports.addProduct = (req, res, next) => {
  let newProduct = new Products({
    name: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    businessId: req.body.businessId,
    category: req.body.category,
  });
  newProduct
    .save()
    .then((data) => {
      res.status(201).json({ status: "success", message: "product added" });
    })
    .catch((err) => next(err));
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

module.exports.checkForBusinessValidity = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Products.find({ _id: productId });
    if (product && product.businessId === req.id) next();
  } catch (err) {
    res.status(404).json({
      sucess: false,
      message: "something went wrong, please try again",
    });
  }
};

module.exports.deleteimage = (req, res, next) => {
  const productId = req.params.id;
  const imagePath = path.join(
    "images",
    "products",
    productId,
    req.body.imageName
  );
  fs.unlinkSync(imagePath, (err) => console.log("error : ", err));
};

module.exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    console.log(req.id);
    const review = {
      name: req.body.name,
      rating: Number(rating),
      comment,
      user: req.id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

exports.searchProduct = async (req, res, next) => {
  try {
    const searchQuery = req.query.q.trim();
    if (!searchQuery) throw new Error("Search Query must not be empty.");

    const matchingProducts = await Products.find(
      {
        name: { $regex: new RegExp(searchQuery, "i") },
      },
      { name: 1, price: 1, rating: 1 }
    );

    if (!matchingProducts.length)
      throw new Error("Sorry! Couldnt find a product with that name");

    res.json({ msg: "success", matchingProducts });
  } catch (error) {
    if (error.message.includes("empty")) error.status = 400;
    if (error.message.includes("Couldnt find")) error.status = 404;
    next(error);
  }
};
