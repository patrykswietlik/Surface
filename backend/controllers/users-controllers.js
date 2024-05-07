const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Team = require('../models/team');

const getUserById = async (req, res, next) => {
	const userId = req.params.userId;

	let existingUser = undefined;
	try {
		existingUser = await User.findById(userId);
	} catch (err) {
		return next(new HttpError('Could not fetch user, please try again.', 500));
	}

	if (!existingUser) {
		return next(new HttpError('Could not find user.', 404));
	}

	res.json(existingUser.toObject({ getters: true }));
};

const assignUserToTeam = async (req, res, next) => {
	const { team } = req.body;
	const userId = req.params.userId;

	let existingUser = undefined;
	try {
		existingUser = await User.findById(userId);
	} catch (err) {
		return next(new HttpError('Could not fetch user, please try again.', 500));
	}

	if (!existingUser) {
		return next(new HttpError('Could not find user.', 404));
	}

	let existingTeam = undefined;
	try {
		existingTeam = await Team.findOne({ name: team });
	} catch (err) {
		return next(new HttpError('Could not fetch team, please try again.', 500));
	}

	if (!existingTeam) {
		return next(new HttpError('Could not find team.', 404));
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();

		existingUser.team = existingTeam;
		//existingTeam.users.push(existingUser);
		await existingUser.save({ session });
		//	await existingTeam.save({ session });
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		return next(new HttpError('Could not perform action.', 500));
	}

	res.json({ user: existingUser.toObject({ getters: true }), team: existingTeam.toObject({ getters: true }) });
};

exports.getUserById = getUserById;
exports.assignUserToTeam = assignUserToTeam;
