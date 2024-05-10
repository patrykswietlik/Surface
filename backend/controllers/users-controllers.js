const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const getExistingObject = require('../utils/get-existing');

const getUserById = async (req, res, next) => {
	const userId = req.params.userId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	res.json(existingUser.payload.toObject({ getters: true }));
};

const assignUserToTeam = async (req, res, next) => {
	const { team } = req.body;
	const userId = req.params.userId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	let existingTeam = await getExistingObject('Team', {
		type: 'NAME',
		payload: team,
	});

	if (!existingTeam.ok) {
		return next(new HttpError(existingTeam.message, existingTeam.status));
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		existingUser.payload.team = existingTeam.payload;
		await existingUser.payload.save({ session });
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		return next(new HttpError('Could not perform action.', 500));
	}

	res.json({
		user: existingUser.payload.toObject({ getters: true }),
		team: existingTeam.payload.toObject({ getters: true }),
	});
};

exports.getUserById = getUserById;
exports.assignUserToTeam = assignUserToTeam;
