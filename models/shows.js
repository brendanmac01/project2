const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	name: {type: String, required: true },
	platform: {type: String, required: false },
    notes: {type: String, required: false},
	img: {type: String, required: false},
});

// showSchema.pre('save', function(next) {
//   if (typeof this.watched === 'string') {
//     this.watched = (this.watched === 'on');
//   }
//   next();
// });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;