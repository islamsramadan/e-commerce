require('../models/product');

const mongoose = require('mongoose');
const product = require('../models/product');

let Products = mongoose.model('product');
const fs = require('fs');
const path = require('path');

module.exports.getAllProducts = (req, res, next) => {
	Products.find({})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => next(error));
};

module.exports.addProduct = (req, res, next) => {
	let newProduct = new Products({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		quantity: req.body.quantity,
		businessId: req.body.businessId,
		category: req.body.category,
	});
	newProduct
		.save()
		.then((data) => {
			res.status(201).json({ data: data, message: 'product added successfully' });
		})
		.catch((err) => next(err));
};

module.exports.updateProduct = (req, res, next) => {
	Products.findOne({ _id: req.body.id })
		.then((data) => {
			for (prop in req.body) {
				data[prop] = req.body[prop];
			}
			return data.save().then((data) => {
				res.status(200).json({
					message: 'product updated',
					data: data,
					update: req.body,
				});
			});
		})
		.catch((err) => next(err));
};

module.exports.getOneProduct = (req, res, next) => {
	Products.findOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => next(err));
};

module.exports.deleteOneProduct = (req, res, next) => {
	Products.deleteOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => next(err));
};

module.exports.checkForBusinessValidity = async (req, res, next) => {
	const productId = req.params.id;
	try {
		const product = await Products.find({ _id: productId });
		if (product && product.businessId === req.id) next();
	} catch (err) {
		res.status(404).json({
			sucess: false,
			message: 'something went wrong, please try again',
		});
	}
};

module.exports.deleteimage = (req, res, next) => {
	const productId = req.params.id;
	const imagePath = path.join('images', 'products', productId, req.body.imageName);
	fs.unlinkSync(imagePath, (err) => console.log('error : ', err));
};
