const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
	User.findOne({ _id: req.id }).then((user) => {
		if (user.isVerified) {
			next();
		} else {
			res.status(403).json({
				success: false,
				message: 'User is not verified',
			});
		}
	});
};
