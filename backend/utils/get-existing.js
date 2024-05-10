const Task = require('../models/task');
const Team = require('../models/team');
const User = require('../models/user');

const getExistingObject = async (model, data) => {
	let existingObject = undefined;
	try {
		switch (model) {
			case 'Task':
				existingObject = await Task.findById(data);
				break;
			case 'Team':
				if (data.type === 'ID') {
					existingObject = await Team.findById(data.payload);
				} else {
					existingObject = await Team.findOne({ name: data.payload });
				}

				break;
			case 'User':
				existingObject = await User.findById(data);
				break;
		}
	} catch (err) {
		return {
			ok: false,
			message: `Could not fetch ${model}, please try again.`,
			status: 500,
			payload: null,
		};
	}

	if (!existingObject) {
		return {
			ok: false,
			message: `${model} does not exist.`,
			status: 404,
			payload: null,
		};
	}

	return {
		ok: true,
		message: '',
		status: 200,
		payload: existingObject,
	};
};

module.exports = getExistingObject;
