import mongoose from "mongoose"
const noteschema = new mongoose.Schema(

    {
        tittle: {
            type: String,
            required: true,
            timestamps: true
        },
        discription: {
            type: String,
            required: true,
            timestamps: true
        },

    }
)
const Note = mongoose.model("Note",noteschema);
export default Note