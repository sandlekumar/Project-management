const Attachment = require('../models/Attachment');

exports.uploadAttachment = async (req, res) => {
    try {
        const { task, fileUrl } = req.body;
        const attachment = new Attachment({
            task,
            fileUrl,
            uploadedBy: req.user._id
        });
        await attachment.save();
        res.status(201).json(attachment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAttachments = async (req, res) => {
    try {
        const filter = {};
        if (req.query.task) filter.task = req.query.task;

        const attachments = await Attachment.find(filter).populate('uploadedBy', 'name email');
        res.status(200).json(attachments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findById(req.params.id);
        if (!attachment) return res.status(404).json({ message: "Attachment not found" });

        if (attachment.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this attachment" });
        }

        await Attachment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Attachment removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
