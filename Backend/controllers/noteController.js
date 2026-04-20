import Note from "../models/noteModel.js";

export const createNote = async (req, res) => {
    try {
        const { tittle, discription, isPublic } = req.body;
        const note = await Note.create({
            tittle,
            discription,
            isPublic: isPublic ?? false,
            user: req.user._id,
        });
        res.status(200).json({ message: "note created successfully", note })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getnotes = async (req, res) => {
    try {
        // Only return public notes for the public feed
        const notes = await Note.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .populate("user", "userName");
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deletenote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Only owner can delete
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note deleted successfully", note })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { tittle, discription, isPublic } = req.body;

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Only owner can update
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            { tittle, discription, isPublic },
            { new: true }
        );
        res.status(200).json({ message: "Note updated successfully", note: updated })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const likeNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        const userId = req.user._id.toString();
        const alreadyLiked = note.likes.map(id => id.toString()).includes(userId);

        if (alreadyLiked) {
            note.likes = note.likes.filter(id => id.toString() !== userId);
        } else {
            note.likes.push(req.user._id);
        }

        await note.save();
        res.status(200).json({ message: "Like toggled", likes: note.likes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Your notes fetched successfully", notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
