const { body, param } = require('express-validator');

// User Validations
module.exports.onLogin = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('password')
		.notEmpty()
		.withMessage('password cannot be empty')
		.isLength({ min: 8, max: 12 })
		.withMessage('Password length must be between 8:12 characters'),
];

module.exports.onSignup = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),

	body('password')
		.notEmpty()
		.withMessage('password cannot be empty')
		.isLength({ min: 8, max: 12 })
		.withMessage('Password length must be between 8:12 characters'),

	body('role')
		.notEmpty()
		.withMessage('role cannot be empty')
		.isIn(['customer', 'business'])
		.withMessage('role must be `customer` OR `business`'),

	body('phone')
		.notEmpty()
		.withMessage('phone cannot be empty')
		.isMobilePhone()
		.withMessage('enter a valid phone format'),

	body('city')
		.notEmpty()
		.withMessage('city cannot be empty')
		.isString()
		.withMessage('city must be a string'),

	body('street')
		.notEmpty()
		.withMessage('street cannot be empty')
		.isString()
		.withMessage('street must be a string'),

	body('building')
		.notEmpty()
		.withMessage('building name cannot be empty')
		.isString()
		.withMessage('building name must be a string'),

	body('floor')
		.notEmpty()
		.withMessage('floor cannot be empty')
		.isString()
		.withMessage('floor must be a string'),

	body('firstname').optional().isString().withMessage('firstname must be string'),

	body('lastname').optional().isString().withMessage('lastname must be string'),

	body('name').optional().isString().withMessage('name must be string'),

	body('description').optional().isString().withMessage('description must be string'),
];

module.exports.onPassReset = [
	body('email')
		.notEmpty()
		.withMessage('email cannot be empty')
		.isEmail()
		.withMessage('Enter a valid email format'),
];

module.exports.onSetNewPass = [
	body('userId')
		.notEmpty()
		.withMessage('userId cannot be empty')
		.isMongoId()
		.withMessage('userId must be a Mongo ObjectId'),

	body('newPassword')
		.notEmpty()
		.withMessage('password cannot be empty')
		.isLength({ min: 8, max: 12 })
		.withMessage('Password length must be between 8:12 characters'),

	body('resetToken')
		.notEmpty()
		.withMessage('resetToken cannot be empty')
		.isString()
		.withMessage('reset token must be string'),
];
