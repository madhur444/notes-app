import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors";

dotenv.config()
const app  = express()
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use("/api/users",userRoutes)
app.get("/",(req,res)=>{
    res.send(`hello this is my port ${process.env.PORT}`)
})
connectDb()
app.listen(process.env.PORT)
