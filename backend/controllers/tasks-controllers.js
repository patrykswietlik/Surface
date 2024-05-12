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
	const { tasks, userId } = req.body;

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

				if (task.isTaken) {
					existingTask.payload.user = userId;
				} else {
					existingTask.payload.user = undefined;
				}

				try {
					await existingTask.payload.save();
				} catch (err) {
					throw new HttpError('Could not save tasks, please try again.', 500);
				}
			})
		);
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		return next(new HttpError('Could not perform changes, please try again.', 500));
	}

	res.json({ message: 'Tasks updated.' });
};

const getTasksForTeam = async (req, res, next) => {
	const userId = req.params.userId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	let tasks = [];
	try {
		tasks = await Task.find({ team: existingUser.payload.team });
	} catch (err) {
		return next(new HttpError('Could not get Tasks, please try again.', 500));
	}

	res.json(tasks.map(task => task.toObject({ getters: true })));
};

const assignUserToTask = async (req, res, next) => {
	const { userId } = req.body;
	const taskId = req.params.taskId;
	let existingUser = await getExistingObject('User', userId);

	if (!existingUser.ok) {
		return next(new HttpError(existingUser.message, existingUser.status));
	}

	let existingTask = await getExistingObject('Task', taskId);

	if (!existingTask.ok) {
		return next(new HttpError(existingTask.message, existingTask.status));
	}

	try {
		existingTask.payload.user = existingUser.payload;
		existingTask.payload.isTaken = true;
		await existingTask.payload.save();
	} catch (err) {
		return next(new HttpError('Could not assign Task, please try again.', 500));
	}

	res.json({ message: 'Task assigned.' });
};

const editTaskState = async (req, res, next) => {
	const taskId = req.params.taskId;
	const { type, value } = req.body;
	let existingTask = await getExistingObject('Task', taskId);

	if (!existingTask.ok) {
		return next(new HttpError(existingTask.message, existingTask.status));
	}

	try {
		switch (type) {
			case 'COMPLETE':
				existingTask.payload.isCompleted = value;
				existingTask.payload.isFlagged = false;
				break;
			case 'FLAG':
				existingTask.payload.isFlagged = value;
				existingTask.payload.isCompleted = false;
				break;
			case 'REMOVE':
				existingTask.payload.isTaken = value;
				existingTask.payload.isCompleted = false;
				existingTask.payload.isFlagged = false;
				existingTask.payload.user = undefined;
				break;
		}
		await existingTask.payload.save();
	} catch (err) {
		return next(new HttpError('Could not edit Task, please try again.', 500));
	}

	res.json({ mesage: 'Task succesfully edited.' });
};

exports.addTask = addTask;
exports.getTasks = getTasks;
exports.patchAllTasks = patchAllTasks;
exports.getTasksByUserTeam = getTasksByUserTeam;

exports.getTasksForTeam = getTasksForTeam;
exports.assignUserToTask = assignUserToTask;
exports.editTaskState = editTaskState;
