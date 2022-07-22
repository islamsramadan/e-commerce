const express = require('express');
const router = express.Router();

const authController = require('../controllers/userAuth');
const authValidator = require('../validators/authInputValidators');

router.post('/login', authValidator.onLogin, authController.login);
router.post('/signup',authValidator.onSignup, authController.signup);
router.post('/resetPassword',authValidator.onPassReset, authController.resetPassword);
router.post('/setnewPassword',authValidator.onSetNewPass, authController.setNewPassword);

module.exports = router;
