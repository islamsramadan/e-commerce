const fs = require('fs');
const path = require('path');

const User = require('../models/user');
const Customer = require('../models/customer');
const Business = require('../models/business');

module.exports.deleteAllUsers = async (req, res, next) => {
	User.find({}).then((users) => {
		users.forEach((user) => {
			user.remove().then(async () => {
				if (user.role === 'customer') {
					await Customer.deleteOne({ userId: user._id });
				} else {
					await Business.findOne({ userId: user._id }).then((business) => {
						//delete profile image
						fs.unlink(business.imageLink, function (err) {
							err? console.log(err) : console.log('profile deleted');
						});
						fs.rm(
							path.join('images', 'commercialRegister', user._id.toString()),
							{ recursive: true },
							(err) => {
								err? console.log(err) : console.log('ComReg deleted');
							}
						);
						business.remove();
					});
				}
			});
		});
		return res.status(200).json({
			success: true,
			message: 'all users have been deleted',
		});
	});
};
