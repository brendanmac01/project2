const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	name: { type: String, required: true },
	platform: { type: String, required: true },
    notes: {type: String, required: false},
	completed: Boolean,
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;