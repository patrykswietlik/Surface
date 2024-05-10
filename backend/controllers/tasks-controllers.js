const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Task = require('../models/task');

const getExistingObject = require('../utils/get-existing');

const addTask = async (req, res, next) => {
	const { title, description, deadline, team } = req.body;
	let existingTeam = await getExistingObject('Team', {
		type: 'NAME',
		payload: team,
	});

	if (!existingTeam.ok) {
		return next(new HttpError(existingTeam.message, existingTeam.status));
	}

	const createdTask = new Task({
		title,
		description,
		deadline,
		team: existingTeam.payload,
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	});

	try {
		await createdTask.save();
	} catch (err) {
		return next(new HttpError('Creating new task failed, please try again.', 500));
	}

	res.json(createdTask.toObject({ getters: true }));
};

const getTasks = async (req, res, next) => {
	let tasks;

	try {
		tasks = await Task.find();
	} catch (err) {
		return next(new HttpError('Could not get tasks, please try again.', 500));
	}

	res.json(tasks.map(task => task.toObject({ getters: true })));
};

const getTasksByUserTeam = async (req, res, next) => {
	const userId = req.params.userId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	let tasks = [];
	try {
		tasks = await Task.find({ team: existingUser.payload.team });
	} catch (err) {
		return next(new HttpError('Could not fetch user tasks, please try again.', 500));
	}

	res.json({ tasks: tasks.map(task => task.toObject({ getters: true })) });
};

const patchAllTasks = async (req, res, next) => {
	const tasks = req.body;

	if (!tasks) {
		return res.json({ message: 'Nothing to change. Please select at least one task.' });
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();

		await Promise.all(
			tasks.map(async task => {
				const taskId = task.id;
				let existingTask = await getExistingObject('Task', taskId);

				if (!existingTask.ok) {
					return next(new HttpError(existingTask.message, existingTask.status));
				}

				existingTask.payload.title = task.title;
				existingTask.payload.description = task.description;
				existingTask.payload.deadline = task.deadline;
				existingTask.payload.isTaken = task.isTaken;
				existingTask.payload.isCompleted = task.isCompleted;
				existingTask.payload.isFlagged = task.isFlagged;

				try {
					await existingTask.payload.save();
				} catch (err) {
					throw new HttpError('Could not save tasks, please try again.', 500);
				}
			})
		);
		await session.commitTransaction();
	} catch (err) {
		return next(new HttpError('Could not perform changes, please try again.', 500));
	}

	res.json({ message: 'Tasks updated.' });
};

// I don't know yet if it is still used or even required, but let's leave it for now.
const assignTaskToUser = async (req, res, next) => {
	const { user } = req.body;
	const userId = user;
	const taskId = req.params.taskId;
	let existingTask = await getExistingObject('Task', taskId);

	if (!existingTask.ok) {
		return next(new HttpError(existingTask.message, existingTask.status));
	}

	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	if (existingUser.payload.team.name !== existingTask.payload.team.name) {
		return next(new HttpError("That User can't take this task.", 422));
	}

	try {
		existingTask.payload.isTaken = true;
		existingTask.payload.user = existingUser;
		await existingTask.payload.save();
	} catch (err) {
		return next(new HttpError('Could not perform assigning task', 500));
	}

	res.json({ message: 'Tasks assigned.' });
};

exports.addTask = addTask;
exports.getTasks = getTasks;
exports.patchAllTasks = patchAllTasks;
exports.assignTaskToUser = assignTaskToUser;
exports.getTasksByUserTeam = getTasksByUserTeam;
