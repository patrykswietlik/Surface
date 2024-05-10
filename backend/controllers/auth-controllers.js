const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
	const { name, email, password } = req.body;
	let existingUser = undefined;

	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HttpError('Signing up failed, please try again.', 500));
	}

	if (existingUser) {
		return next(new HttpError('User already exists, please login instead.', 422));
	}

	const createdUser = new User({
		name,
		email,
		password,
		team: undefined,
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HttpError('Could not save user.', 500));
	}

	res.json(createdUser.toObject({ getters: true }));
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	let existingUser = undefined;

	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HttpError('Loggin in failed, please try again.', 500));
	}

	if (!existingUser || existingUser.password !== password) {
		return next(new HttpError('Invalid credentials, please try again.', 401));
	}

	const token = 'random_server_token';
	res.json({ token, id: existingUser.toObject({ getters: true }).id });
};

exports.signup = signup;
exports.login = login;
