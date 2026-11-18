const mongoose = require('mongoose');
const Note = require('../models/Note');

// @desc    Create a note for the authenticated user
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400);
      throw new Error('Please provide a valid note title');
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      res.status(400);
      throw new Error('Please provide valid note content');
    }

    // Never trust user IDs sent in req.body; always use req.user._id from verified JWT
    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all notes belonging to the logged-in user
// @route   GET /api/notes
// @access  Private
const getMyNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single note owned by the logged-in user
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid note ID format');
    }

    const note = await Note.findById(id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Forbidden: you do not have permission to access this note');
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note owned by the logged-in user
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid note ID format');
    }

    const note = await Note.findById(id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Forbidden: you cannot modify another user\'s note');
    }

    const { title, content } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        res.status(400);
        throw new Error('Title must be a non-empty string');
      }
      note.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== 'string' || !content.trim()) {
        res.status(400);
        throw new Error('Content must be a non-empty string');
      }
      note.content = content.trim();
    }

    if (title === undefined && content === undefined) {
      res.status(400);
      throw new Error('Please provide title or content to update');
    }

    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note owned by the logged-in user
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid note ID format');
    }

    const note = await Note.findById(id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Forbidden: you cannot delete another user\'s note');
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: { id: note._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getMyNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
