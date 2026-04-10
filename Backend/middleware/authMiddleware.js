import jwt from "jsonwebtoken"
import User from "../models/userModel"

export const protect = async (req,res,next)=>{
try {
    const token = req.header.authorization

    if(!token){
        return res.status(499).json({
            message:"No user found"
        })
    }
    const decoded = jwt.verify(token,"mysecretkey")
    const user = await User.findById(decoded.id).select("-password")
    req.user = user
    next()
} catch (error) {
    res.status(501).json({
        message:error.message
    })
}
}