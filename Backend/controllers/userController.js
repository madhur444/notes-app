import  bcrypt from "bcrypt"
import User from "../models/userModel.js"
import genrateToken from "../config/genrateToken.js";

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
export const login = async (req,res) =>{
  try {
      const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json(
            {
                message:"User does not exist"
            }
        )}
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
        return res.status(404).json({
            message:"Password does not match"
        })
        }
res.status(201).json({
    message:"User loged IN ",
    token:genrateToken(user._id),
    user
})
  } catch (error) {
  res.status(501).json(
    {
        message:error.message
    }
  )  
  }
}