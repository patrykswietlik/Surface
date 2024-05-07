const HttpError = require('../models/http-error');
const Team = require('../models/team');

const createTeam = async (req, res, next) => {
	const { name, field } = req.body;

	let existingTeam = undefined;
	try {
		existingTeam = await Team.findOne({ name });
	} catch (err) {
		return next(new HttpError('Could not create Team, please try again.', 500));
	}

	if (existingTeam) {
		return next(new HttpError('Team already exist.', 422));
	}

	const createdTeam = new Team({
		name,
		field,
		//users: [],
	});

	try {
		await createdTeam.save();
	} catch (err) {
		return next(new HttpError('Could not save craeted Team, please try again.', 500));
	}

	res.json(createdTeam.toObject({ getters: true }));
};

exports.createTeam = createTeam;
