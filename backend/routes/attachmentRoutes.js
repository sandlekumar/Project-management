const express = require('express');
const router = express.Router();
const { uploadAttachment, getAttachments, deleteAttachment } = require('../controllers/attachmentController');
const { protect } = require('../middleware/authmiddleware');

router.post('/', protect, uploadAttachment);
router.get('/', protect, getAttachments);
router.delete('/:id', protect, deleteAttachment);

module.exports = router;
