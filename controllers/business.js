const mongoose = require('mongoose');
const fs = require('fs');

require('../models/business');
require('../models/user');

let Business = mongoose.model('business');

module.exports.getAllBusinesses = (req, res, next) => {
	Business.find({})
		.populate({ path: 'userId', select: { email: 1 } })
		.then((data) => {
			res.status(200).json(data);
		});
};

module.exports.getBusinessById = (req, res, next) => {
	Business.findById({ _id: req.params.id })
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			next(err);
		});
};

module.exports.addBusiness = (req, res, next) => {

	let business = new Business({
		userId: req.body.userId,
		name: req.body.name,
		imageLink: req.body.imageLink,
		verification: {
			comRegImgLink: req.body.comRegImgLink,
		},
		description: req.body.description,
	});


	business
		.save()
		.then((data) => {
			res.status(200).json({ data: 'add' });
		})
		.catch((err) => {
			next(err);
		});
};

// Update Business

module.exports.updateBusiness = (req, res, next) => {
	Business.findOne({ _id: req.body.id }).then((data) => {
		data.name = req.body.name;
		// update here
		data.description = req.body.description;
		return data.save().then((data) => {
			res.status(200).json('business has been updated');
		});
	});
	// console.log("req.body.id", req.body.id);
	// res.status(200).json("business has been updated");
};

module.exports.deleteProfileImage = (req, res, next) => {
	const userId = req.params.id;
	Business.findOne({ userId: userId })
		.then((data) => {
			fs.unlinkSync(data.imageLink, (err) => console.log('error : ', err));
		})
		.catch((err) => {
			next(err);
		});
	next();

};

module.exports.updateProfileImageLink = (req, res, next) => {
	Business.findOne({ userId: req.params.id })
		.then((data) => {
			data.imageLink = req.file.path;
			return data.save().then((data) => {
				res.status(200).json({ message: 'img updated' });
			});
		})
		.catch((err) => {
			next(err);
		});
};


module.exports.deleteComRegImage = (req, res, next) => {
	const userId = req.params.id;
	Business.findOne({ userId: userId })
		.then((data) => {
			fs.unlinkSync(data.verification.comRegImgLink, (err) => console.log('error : ', err));
		})
		.catch((err) => {
			next(err);
		});
	next();
};

module.exports.uploadComRegImg = (req, res, next) => {
	res.status(200).json({ message: 'img updated' });
}

// module.exports.updateComRegImageLink = (req, res, next) => {
// 	Business.findOne({ userId: req.params.id })
// 		.then((data) => {
// 			data.verification.comRegImgLink = req.file.path;
// 			return data.save().then((data) => {
// 				res.status(200).json({ message: 'img updated' });
// 			});
// 		})
// 		.catch((err) => {
// 			next(err);
// 		});
// };


// module.exports.updateBusiness = (req, res, next) => {
//   Business.findOne({ _id: req.params.id }).then((data) => {
//     data.name = req.body.name;
//     data.description = req.body.description;
//     return data.save().then((data) => {
//       res.status(200).json("business has been updated");
//     });
//   });
//   // console.log(req.params.id);
//   // console.log(req.body);
//   // res.status(201).json({ data: "add" });
//   // res.status(201).json({ data: "add" });
// };
