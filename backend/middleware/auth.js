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

		const decodedToken = jwt.verify(token, 'top_secret_private_key');
		req.userData = { userId: decodedToken.userId };

		next();
	} catch (err) {
		return next(new HttpError('Authentication failed.', 500));
	}
};
