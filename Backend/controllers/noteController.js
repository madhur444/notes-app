import Note from "../models/noteModel.js";



export const createNote = async (req, res) => {
    try {
        const { tittle, discription } = req.body;
        const note = await Note.create({
            tittle,
            discription,
            user:req.user._id,
        });
        res.status(200).json({ message: "note created successfully", note })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getnotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const deletenote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json(
            {
                message: "Your note has deleted saxfuly",
                note
            }
        )
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}
export const updateNote = async (req,res)=>{
    try {
        const {tittle,discription}= req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {tittle,discription},
            {new:true}
        );
        res.status(200).json({
            message:"note hogya bhai change pese nikal chal!!!",
            note,
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
export const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });

    res.status(200).json({
      message: "Your notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};