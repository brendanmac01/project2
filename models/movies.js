const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {type: String, required: true },
	platform: {type: String, required: false },
    notes: {type: String, required: false},
	img: {type: String, required: false},
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;