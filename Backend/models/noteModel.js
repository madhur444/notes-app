import mongoose from "mongoose"

const noteschema = new mongoose.Schema(
    {
        tittle: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    { timestamps: true }
)

const Note = mongoose.model("Note", noteschema);
export default Note
