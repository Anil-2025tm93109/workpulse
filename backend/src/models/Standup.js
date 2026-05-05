const mongoose = require('mongoose');

const standupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    yesterday: {
      type: String,
      required: [true, 'What did you do yesterday?'],
    },
    today: {
      type: String,
      required: [true, 'What will you do today?'],
    },
    blockers: {
      type: String,
      default: 'None',
    },
    hasBlocker: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Standup', standupSchema);