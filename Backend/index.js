import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
dotenv.config()
const app  = express()
app.get("/",(req,res)=>{
    res.send(`hello this is my port ${process.env.PORT}`)
})
connectDb()
app.listen(process.env.PORT)
