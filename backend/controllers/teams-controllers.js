const HttpError = require('../models/http-error');
const Team = require('../models/team');
const User = require('../models/user');

const getExistingObject = require('../utils/get-existing');

const createTeam = async (req, res, next) => {
	const { name, field } = req.body;
	let existingTeam = await getExistingObject('Team', {
		type: 'NAME',
		payload: name,
	});

	if (existingTeam.ok) {
		return next(new HttpError('Team already exist.', 422));
	}

	const createdTeam = new Team({
		name,
		field,
	});

	try {
		await createdTeam.save();
	} catch (err) {
		return next(new HttpError('Could not save craeted Team, please try again.', 500));
	}

	res.json(createdTeam.toObject({ getters: true }));
};

const getTeamByUserId = async (req, res, next) => {
	const userId = req.params.userId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	const teamId = existingUser.payload.team;
	const existingTeam = await getExistingObject('Team', {
		type: 'ID',
		payload: teamId,
	});

	if (!existingTeam.ok) {
		return next(new HttpError(existingTeam.message, existingTeam.status));
	}

	let members = [];
	try {
		members = await User.find({ team: existingTeam.payload });
	} catch (err) {
		return next(new HttpError('Could not fetch Team, please try again.', 500));
	}

	res.json({ name: existingTeam.payload.name, members: members.map(member => member.toObject({ getters: true })) });
};

exports.createTeam = createTeam;
exports.getTeamByUserId = getTeamByUserId;
