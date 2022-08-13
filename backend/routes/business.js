const express = require('express');
const businessRoute = express.Router();

const { body, query, param } = require('express-validator');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const validationMW = require('../middlewares/validationMW');
const uploadFileMW = require('../middlewares/filesUpload');
const authMW = require('../middlewares/isAuthenticated');
// ----------Testing
require('../models/business');
let Business = mongoose.model('business');

const {
	getAllBusinesses,
	getBusinessById,
	addBusiness,
	updateBusiness,
	updateProfileImageLink,
	deleteProfileImage,
	uploadComRegImg,
	getBusinessStatistics,
} = require('../controllers/business');

businessRoute
	.route('/business')
	.get(authMW, getAllBusinesses)
	.put(
		authMW,
		[
			param('id').notEmpty().isMongoId(),
			body('name').optional().isString().withMessage('name should be a string'),
			body('description').optional().isString().withMessage('description should be string'),
		],
		// validationMW,
		updateBusiness
	);

businessRoute
	.route('/business/:id')
	.get(
		authMW,
		[param('id').notEmpty().isMongoId().withMessage("User'is id should be a valid MongoID")],
		validationMW,
		getBusinessById
	);

businessRoute.route('/business/updateProfileImg/:id').post(
	// authMW,
	deleteProfileImage,
	uploadFileMW.single('image'),
	updateProfileImageLink
);

businessRoute.route('/business/uploadComReg/:id').post(
	// authMW,
	uploadFileMW.array('image'),
	uploadComRegImg
);

businessRoute.get('/business/getBusinessStatistics/:id', getBusinessStatistics);

module.exports = businessRoute;
