const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {

		if(req.body.type == undefined || req.body.type == null){
			console.log(file);
			cb(new Error('Error : file type is must be provided [businessProfile , commercial , product]'))
		}

		// uploaing business profile image
		if (req.body.type == 'businessProfile') {
			console.log(file);
			cb(null, path.join('images', 'business'));
		}
		// uploading business commercial registration image
		else if (req.body.type == 'commercial') {
			console.log(file);
			const dir = path.join('images', 'commercialRegister', req.params.id);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			cb(null, dir);
		}
		// uploading products image
		else if (req.body.type == 'product') {
			console.log(file);
			const dir = path.join('images', 'products', req.params.id);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			cb(null, dir);
		}
	},
	filename: (req, file, cb) => {
		const id = req.params.id;
		const imageExtencion = '.' + file.originalname.split('.').pop();

		// naming for business profile like 'id.ext'
		if (req.body.type == 'businessProfile') {
			cb(null, id + imageExtencion);
		}
		//naming for commercial registeration like 'id-time.ext'
		else if (req.body.type == 'commercial') {
			cb(null, id + '-' + Date.now() + imageExtencion);
		}
		//naming for product like 'id-time.ext'
		else if (req.body.type == 'product') {
			cb(null, id + '-' + Date.now() + imageExtencion);
		}
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });
