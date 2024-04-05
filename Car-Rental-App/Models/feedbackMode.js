

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
//   carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
