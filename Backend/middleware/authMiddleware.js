import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    let token;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }

    console.log("HEADER:", authHeader);
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token.trim(), "mysecretkey");

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};