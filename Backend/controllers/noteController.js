import Note from "../models/noteModel.js";



export const createNote = async (req,res)=>{
    try {
        const{tittle,discription} = req.body;
        const note = await Note.create({
            tittle,
            discription
        });
        res.status(200).json({message:"note created successfully",note})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}