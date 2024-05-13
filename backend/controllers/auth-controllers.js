const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

	let hashedPassword = null;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		return next(new HttpError('Could not create User, please try again.', 500));
	}

	const createdUser = new User({
		name,
		email,
		password: hashedPassword,
		team: undefined,
		role: 'USER',
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HttpError('Could not save user.', 500));
	}

	//TODO: creating and sending token

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

	if (!existingUser) {
		return next(new HttpError('Invalid credentials, please try again.', 401));
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		return next(new HttpError('Could not authentice, please try again.', 500));
	}

	if (!isValidPassword) {
		return next(new HttpError('Invalid credentials, please try again.', 401));
	}

	let token = null;
	try {
		token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email, role: existingUser.role },
			'top_secret_private_key',
			{
				expiresIn: '1h',
			}
		);
	} catch (err) {
		return next(new HttpError('Could not authentice, please try again.', 500));
	}

	res.json({ userId: existingUser.id, token, role: existingUser.role });
};

exports.signup = signup;
exports.login = login;
