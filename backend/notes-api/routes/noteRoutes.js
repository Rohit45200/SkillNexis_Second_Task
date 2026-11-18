const express = require('express');
const {
  createNote,
  getMyNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createNote).get(getMyNotes);
router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

module.exports = router;
