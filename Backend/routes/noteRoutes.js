import express from "express"
import { createNote,deletenote,getMyNotes,getnotes, updateNote } from "../controllers/noteController.js"
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/",protect,createNote)
router.get("/my-notes",protect,getMyNotes)
router.get("/",getnotes)
router.delete("/:id",deletenote)
router.put("/:id",updateNote)
export default router;