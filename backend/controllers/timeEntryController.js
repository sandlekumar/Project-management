const TimeEntry = require('../models/TimeEntry');

exports.createTimeEntry = async (req, res) => {
    try {
        const { task, hours, date } = req.body;
        const timeEntry = new TimeEntry({
            task,
            user: req.user._id,
            hours,
            date: date || Date.now()
        });
        await timeEntry.save();
        res.status(201).json(timeEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTimeEntries = async (req, res) => {
    try {
        const filter = {};
        if (req.query.task) filter.task = req.query.task;
        if (req.query.user) filter.user = req.query.user;

        const timeEntries = await TimeEntry.find(filter).populate('user', 'name email').populate('task', 'title');
        res.status(200).json(timeEntries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTimeEntry = async (req, res) => {
    try {
        const timeEntry = await TimeEntry.findById(req.params.id);
        if (!timeEntry) return res.status(404).json({ message: "Time entry not found" });

        if (timeEntry.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this entry" });
        }

        const updatedEntry = await TimeEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTimeEntry = async (req, res) => {
    try {
        const timeEntry = await TimeEntry.findById(req.params.id);
        if (!timeEntry) return res.status(404).json({ message: "Time entry not found" });

        if (timeEntry.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this entry" });
        }

        await TimeEntry.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Time entry removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
