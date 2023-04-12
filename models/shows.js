const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	name: { type: String, required: true },
	platform: { type: String, required: true },
    notes: {type: String, required: false},
	watched: Boolean,
});

// showSchema.pre('save', function(next) {
//   if (typeof this.watched === 'string') {
//     this.watched = (this.watched === 'on');
//   }
//   next();
// });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;