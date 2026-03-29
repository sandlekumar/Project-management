const express = require('express');
const router = express.Router();
const { createTimeEntry, getTimeEntries, updateTimeEntry, deleteTimeEntry } = require('../controllers/timeEntryController');
const { protect } = require('../middleware/authmiddleware');

router.post('/', protect, createTimeEntry);
router.get('/', protect, getTimeEntries);
router.put('/:id', protect, updateTimeEntry);
router.delete('/:id', protect, deleteTimeEntry);

module.exports = router;
