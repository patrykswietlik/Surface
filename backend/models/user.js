const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	team: { type: mongoose.Types.ObjectId, ref: 'Team' },
});

module.exports = mongoose.model('User', userSchema);
