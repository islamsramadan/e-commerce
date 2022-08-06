const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");

const { body, param } = require("express-validator");

const filesUpload = require("../middlewares/filesUpload");
const validationMW = require("./../middleWares/validationMW");

const authMW = require("../middlewares/isAuthenticated");

router
  .route("/products")
  .get(controller.getAllProducts)
  .post(
    authMW,
    [
      body("name").isString().withMessage("product name should be characters"),
      body("description")
        .isString()
        .withMessage("product description should be characters"),
      body("price").isNumeric().withMessage("product price should be numeric"),
      body("countInStock")
        .isNumeric()
        .withMessage("countInStock should be numeric"),
      body("category")
        .isMongoId()
        .withMessage("product category should be mongo ID"),
      body("businessId")
        .isMongoId()
        .withMessage("product businessId should be mongo ID"),
    ],
    validationMW,
    controller.addProduct
  )
  .put(
    authMW,
    [
      body("id")
        .notEmpty()
        .isMongoId()
        .withMessage("product id should be mongo id"),
      body("name")
        .optional()
        .isString()
        .withMessage("product name should be characters"),
      body("description")
        .optional()
        .isString()
        .withMessage("product description should be characters"),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("product price should be numeric"),
      body("quantity")
        .optional()
        .isNumeric()
        .withMessage("product quantity should be numeric"),
      body("category")
        .optional()
        .isMongoId()
        .withMessage("product category should be mongo ID"),
      body("businessId")
        .optional()
        .isMongoId()
        .withMessage("product businessId should be mongo ID"),
      body("imageLink")
        .optional()
        .isString()
        .withMessage("image link should be string"),
    ],
    validationMW,
    controller.updateProduct
  );

router
  .route("/products/:id")
  .get(
    [
      param("id")
        .notEmpty()
        .isMongoId()
        .withMessage("Product id should be mongo id"),
    ],
    validationMW,
    controller.getOneProduct
  )
  .delete(
    authMW,
    [
      param("id")
        .notEmpty()
        .isMongoId()
        .withMessage("Product id should be mongo id"),
    ],
    validationMW,
    controller.deleteOneProduct
  );

router
  .route("/products/addimages/:id")
  .post(controller.checkForBusinessValidity, filesUpload.array("image"));

router
  .route("/products/removeimage/:id")
  .delete(controller.checkForBusinessValidity, controller.deleteimage);
router.route("/:id/reviews").post(authMW, controller.createProductReview);

router.get("/search", controller.searchProduct);
router.get("/filterBy", controller.filterProducts);
router.get("/toprated", controller.getTopProducts);
router.get("/lastAdded", controller.getLastAdded);
router.get(
  "/relatedProducts/:category",
  [
    param("category")
      .isMongoId()
      .withMessage("Please provide a valid MongoId for the categoryId"),
  ],
  validationMW,
  controller.getRelatedProducts
);
module.exports = router;
