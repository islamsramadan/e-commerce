const express = require("express");
const businessRoute = express.Router();
const { body, query, param } = require("express-validator");
const mongoose = require("mongoose");

// ----------Testing
require("../models/business");
let Business = mongoose.model("business");

// ---------

// Deleting an image
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `business-${req.params.id + "-" + Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

const {
  getAllBusinesses,
  getBusinessById,
  addBusiness,
  updateBusiness,
  uploadImage,
} = require("../controllers/business");

businessRoute
  .route("/business")
  .get(getAllBusinesses)
  .post(addBusiness)
  .put(
    [
      param("id").notEmpty().isMongoId(),
      body("name").optional().isString(),
      body("description").optional().isString(),
    ],
    updateBusiness
  );

businessRoute
  .route("/business/:id")
  .get([param("id").notEmpty().isMongoId()], getBusinessById);

businessRoute.route("/business/upload/:id").put(
  (req, res, next) => {
    console.log(req.params.id);
    Business.findById({ _id: req.params.id })
      .then(async (data) => {
        console.log("data -----------> ", data);
        // if (data.imageLink.indexOf("business")) {
        // }
        await unlinkAsync(data.imageLink);
      })
      .catch((err) => {
        next(err);
      });
    next();
  },
  upload.single("photo"),
  uploadImage
);

module.exports = businessRoute;
