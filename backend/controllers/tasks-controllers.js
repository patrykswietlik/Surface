const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Task = require('../models/task');
const Team = require('../models/team');
const User = require('../models/user');

const addTask = async (req, res, next) => {
	const { title, description, deadline, team } = req.body;

	let existingTeam = undefined;
	try {
		existingTeam = await Team.findOne({ name: team });
	} catch (err) {
		return next(new HttpError('Could not fetch team, please try again.', 500));
	}

	if (!existingTeam) {
		return next(new HttpError('Team is not valid or not exist.', 404));
	}

	const createdTask = new Task({
		title,
		description,
		deadline,
		team: existingTeam,
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

	let existingUser = undefined;
	try {
		existingUser = await User.findById(userId);
	} catch (err) {
		return next(new HttpError('Could not fetch user, please try again.', 500));
	}

	if (!existingUser) {
		return next(new HttpError('User does not exist.', 404));
	}

	let tasks = [];
	try {
		tasks = await Task.find({ team: existingUser.team });
	} catch (err) {
		return next(new HttpError('Could not fetch user tasks, please try again.', 500));
	}

	res.json({ tasks: tasks.map(task => task.toObject({ getters: true })) });
};

const modifyTask = async (taskId, modifiedValues, session) => {
	let existingTask;
	try {
		existingTask = await Task.findById(taskId);
	} catch (err) {
		return next(new HttpError('Could not get task, please try again.', 500));
	}

	existingTask.title = modifiedValues.title;
	existingTask.description = modifiedValues.description;
	existingTask.deadline = modifiedValues.deadline;
	existingTask.isTaken = modifiedValues.isTaken;
	existingTask.isCompleted = modifiedValues.isCompleted;
	existingTask.isFlagged = modifiedValues.isFlagged;

	try {
		await existingTask.save({ session });
	} catch (err) {
		return next(new HttpError('Could not save modified task, please try again.', 500));
	}
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
				await modifyTask(task.id, task, session);
			})
		);
		await session.commitTransaction();
	} catch (err) {
		return next(new HttpError('Could not perform changes, please try again.', 500));
	}

	res.json({ message: 'Tasks updated.' });
};

const assignTaskToUser = async (req, res, next) => {
	const { user } = req.body;
	const taskId = req.params.taskId;

	let existingTask = undefined;
	try {
		existingTask = await Task.findById(taskId);
	} catch (err) {
		return next(new HttpError('Could not fetch task, please try again.', 500));
	}

	if (!existingTask) {
		return next(new HttpError('Task does not exist.', 404));
	}

	let existingUser = undefined;
	try {
		existingUser = await User.findById(user);
	} catch (err) {
		return next(new HttpError('Could not fetch task, please try again.', 500));
	}

	if (!existingUser) {
		return next(new HttpError('User does not exist.', 404));
	}

	if (existingUser.team.name !== existingTask.team.name) {
		return next(new HttpError("That User can't take this task.", 422));
	}

	try {
		existingTask.isTaken = true;
		existingTask.user = existingUser;

		await existingTask.save();
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
