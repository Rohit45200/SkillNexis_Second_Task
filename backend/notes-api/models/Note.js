const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      minlength: [1, 'Note title cannot be empty'],
      maxlength: [150, 'Note title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
      minlength: [1, 'Note content cannot be empty'],
      maxlength: [10000, 'Note content cannot exceed 10000 characters'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
