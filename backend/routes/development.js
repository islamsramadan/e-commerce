const express = require("express")
const router = express.Router();

const developmentController = require("../controllers/developmentController");

router.delete('/users/deleteAll',developmentController.deleteAllUsers)


module.exports = router;