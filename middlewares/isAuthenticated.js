const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
	let decodedToken = null;
	try {
		let token = req.get('Authorization').split(' ')[1];
		decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		req.role = decodedToken.role;
		req.id = decodedToken.id;
        const user = await User.findById(req.id)
		req.user=user
		next();
	} catch (error) {
		res.status(403).json({
			success:false,
			message:'unauthorized User'
		})
		error.status = 403;
		next(error);
	}
};
