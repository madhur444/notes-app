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
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    }
)
const Note = mongoose.model("Note",noteschema);
export default Note