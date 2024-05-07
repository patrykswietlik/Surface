const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	field: { type: String, required: true },
	//users: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
});

module.exports = mongoose.model('Team', teamSchema);
