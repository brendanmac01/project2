const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: { type: String, required: true },
	platform: { type: String, required: true },
    notes: {type: String, required: false},
	watched: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;