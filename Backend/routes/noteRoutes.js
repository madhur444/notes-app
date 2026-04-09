import express from "express"
import { createNote,deletenote,getnotes, updateNote } from "../controllers/noteController.js"

const router = express.Router();
router.post("/",createNote)
router.get("/",getnotes)
router.delete("/:id",deletenote)
router.put("/:id",updateNote)
export default router;