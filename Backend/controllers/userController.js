import  bcrypt from "bcrypt"
import User from "../models/userModel.js"

export const signUp = async (req,res)=>{
    try {
        const {userName,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
})
}
const hashedPassword = await bcrypt.hash(password,10)
const user= await User.create({
    userName,
    email,
    password:hashedPassword,
});
res.status(201).json({
    message:"SignUp succesfull",
    user    
})

    } catch (error) {
        res.status(500).json(
            {
                message:error.message,
            }
        )
    }
}