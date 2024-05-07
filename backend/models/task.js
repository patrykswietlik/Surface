const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	deadline: { type: Date, required: true },
	team: { type: mongoose.Types.ObjectId, required: true, ref: 'Task' },
	isTaken: { type: Boolean, required: true },
	isCompleted: { type: Boolean, required: true },
	isFlagged: { type: Boolean, required: true },
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
