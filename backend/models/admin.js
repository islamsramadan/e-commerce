const mongoose = require('mongoose');

const nameScehma = require('./common');

const adminSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
		auto: true,
	},
	isHead: {
		type: Boolean,
		required: true,
		default: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: nameScehma,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('admin', adminSchema);
