const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication Failed.');
		}

		const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
		req.userData = { userId: decodedToken.userId, role: decodedToken.role };

		next();
	} catch (err) {
		return next(new HttpError('Authentication failed.', 500));
	}
};
