import express from "express"
import { createNote, deletenote, getMyNotes, getnotes, updateNote, likeNote } from "../controllers/noteController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote)
router.get("/my-notes", protect, getMyNotes)
router.get("/", getnotes)
router.delete("/:id", protect, deletenote)
router.put("/:id", protect, updateNote)
router.put("/:id/like", protect, likeNote)

export default router;
