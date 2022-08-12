require("../models/product");

const mongoose = require("mongoose");

let Products = mongoose.model("product");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

module.exports.getAllProducts = (req, res, next) => {
  Products.find({})
    .populate("businessId")
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

module.exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Products.findOne({ _id: req.params.id });
    if (!product) throw new Error("Couldnt find a product with that id");
    directoryPath = path.join(
      __dirname,
      "..",
      "images",
      "products",
      req.params.id
    );
    fs.readdir(directoryPath, (err, files) => {
      if (err)
        return res.status(400).json({
          success: false,
          msg: "Unable to scan directory! " + err.message,
        });
      const fullData = { ...product._doc, images: files };
      res.json({ success: true, fullData });
    });
  } catch (error) {
    next(error);
  }
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
    const searchQuery = req.query.q?.trim();
    if (!searchQuery) throw new Error("Search Query must not be empty.");

    const matchingProducts = await Products.find(
      {
        name: { $regex: new RegExp(searchQuery, "i") },
      },
      { name: 1, price: 1, rating: 1 }
    );

    if (!matchingProducts.length)
      throw new Error("Sorry! Couldnt find a product with that name");

    const maxPrice = findMaxPrice(matchingProducts);
    res.json({ msg: "success", matchingProducts, maxPrice });
  } catch (error) {
    if (error.message.includes("empty")) error.status = 400;
    if (error.message.includes("Couldnt find")) error.status = 404;
    next(error);
  }
};

exports.filterProducts = async (req, res, next) => {
  try {
    const filterKey = Object.keys(req.query)[0]?.toLowerCase().trim();
    console.log(filterKey);
    if (!filterKey)
      throw new Error("Filter criteria must be Category, Price or Rating");

    const filterValue = req.query[filterKey];
    if (!filterValue) throw new Error("Filter value must not be empty");

    let matchingProducts;
    switch (filterKey) {
      case "category":
        const matchingCategory = await Category.findOne(
          { name: req.query.category },
          { _id: 1 }
        );
        if (!matchingCategory)
          throw new Error("Couldnt find category with that name!");

        matchingProducts = await Products.find(
          { category: matchingCategory._id.toString() },
          { name: 1, price: 1, rating: 1 }
        );
        break;

      case "price":
        if (isNaN(req.query.price)) throw new Error("Price must be a number!");
        matchingProducts = await Products.find(
          { price: { $lte: req.query.price } },
          { name: 1, price: 1, rating: 1 }
        );
        break;

      case "rating":
        if (isNaN(req.query.rating))
          throw new Error("Rating must be a number!");
        matchingProducts = await Products.find(
          { rating: req.query.rating },
          { name: 1, price: 1, rating: 1 }
        );
    }

    if (!matchingProducts.length)
      throw new Error("Couldnt find products with that filter value");

    const maxPrice = findMaxPrice(matchingProducts);
    res.json({ data: matchingProducts, maxPrice });
  } catch (error) {
    if (error.message.includes("Couldnt find")) error.status = 404;
    if (error.message.includes("must be")) error.status = 400;
    next(error);
  }
};

// exports.filterProducts = async (req, res, next) => {
//   try {
//     const searchText = req.body.searchText.trim();
//     if (!searchText) throw new Error("Search Query must not be empty.");

//     const filterKey = Object.keys(req.query)[0]?.toLowerCase().trim();
//     if (!filterKey)
//       throw new Error("Filter criteria must be Category, Price or Rating");

//     const filterValue = req.query[filterKey];
//     if (!filterValue) throw new Error("Filter value must not be empty");

//     let matchingProducts;
//     switch (filterKey) {
//       case "category":
//         const matchingCategory = await Category.findOne(
//           { name: req.query.category },
//           { _id: 1 }
//         );
//         if (!matchingCategory)
//           throw new Error("Couldnt find category with that name!");

//         matchingProducts = await Products.find(
//           {
//             category: matchingCategory._id.toString(),
//             name: { $regex: new RegExp(searchText, "i") },
//           },
//           { name: 1, price: 1, rating: 1 }
//         );
//         break;

//       case "price":
//         if (isNaN(req.query.price)) throw new Error("Price must be a number!");
//         matchingProducts = await Products.find(
//           {
//             price: { $lte: req.query.price },
//             name: { $regex: new RegExp(searchText, "i") },
//           },
//           { name: 1, price: 1, rating: 1 }
//         );
//         break;

//       case "rating":
//         if (isNaN(req.query.rating))
//           throw new Error("Rating must be a number!");
//         matchingProducts = await Products.find(
//           {
//             rating: req.query.rating,
//             name: { $regex: new RegExp(searchText, "i") },
//           },
//           { name: 1, price: 1, rating: 1 }
//         );
//     }

//     if (!matchingProducts.length)
//       throw new Error("Couldnt find products with that filter value");

//     const maxPrice = findMaxPrice(matchingProducts);
//     res.json({ data: matchingProducts, maxPrice });
//   } catch (error) {
//     if (error.message.includes("Couldnt find")) error.status = 404;
//     if (error.message.includes("must be")) error.status = 400;
//     next(error);
//   }
// };

const findMaxPrice = (products) => {
  let maxPrice = Number.MIN_SAFE_INTEGER;
  products.forEach((product) => (maxPrice = Math.max(product.price, maxPrice)));
  return maxPrice;
};

module.exports.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({}).sort({ rating: -1 }).limit(5);
  res.json(products);
});

exports.getLastAdded = async (req, res, next) => {
  try {
    const lastAdded = await Products.find(
      {},
      { name: 1, price: 1, category: 1, rating: 1, createdAt: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({ msg: "success", lastAdded });
  } catch (error) {
    next(error);
  }
};

exports.getRelatedProducts = async (req, res, next) => {
  try {
    const relatedProducts = await Products.find(
      {
        category: req.params.category,
      },
      { category: 1 }
    ).limit(5);
    if (!relatedProducts.length)
      throw new Error("Couldnt find products in that category!");

    res.json({ msg: "success", relatedProducts });
  } catch (error) {
    if (error.message.includes("Couldnt find")) error.status = 404;
    next(error);
  }
};

module.exports.getCategoryProducts = (req, res, next) => {
  Products.find({ category: req.params.id })
    .then((data) => {
      console.log(data);
      res.status(200).json({ msg: "success", data });
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};
