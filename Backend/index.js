import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config()
const app  = express()
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.get("/",(req,res)=>{
    res.send(`hello this is my port ${process.env.PORT}`)
})
connectDb()
app.listen(process.env.PORT)
