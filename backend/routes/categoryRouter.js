const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoryController");

const { body, param } = require("express-validator");
const validationMW = require("./../middleWares/validationMW");

const authMW = require("../middlewares/isAuthenticated");

router
  .route("/categories")
  .get(controller.getAllCategories)
  .post(
    authMW,
    [
      body("name").isString().withMessage("category name should be characters"),
      body("description")
        .isString()
        .withMessage("category description should be characters"),
    ],
    validationMW,
    controller.addCategory
  )
  .put(
    authMW,
    [
      body("id").notEmpty().isMongoId().withMessage("id"),
      body("name").optional().isString().withMessage("name"),
      body("description").optional().isString().withMessage("description"),
    ],
    validationMW,
    controller.updateCategory
  );

router
  .route("/categories/:id")
  .get(
    [param("id").notEmpty().isMongoId()],
    validationMW,
    controller.getOneCategory
  )
  .delete(
    authMW,
    [param("id").notEmpty().isMongoId()],
    validationMW,
    controller.deleteOneCategory
  );

module.exports = router;
