import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  
  try {
    const { name, email, phone, password } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });

    }
    // Check if user already exist✅
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" }); 
    }
    // Hashing password✅
    const hashPassword = await bcrypt.hash(password, 10);
    
    // Create new user✅
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
    })
    return res.status(201).json({ message: "User created successfully 🎉", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}



// User login controller🎉

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      

      // Token generation🎉
      const token = jwt.sign({
        userId: user._id,
        name: user.name,
      }
      , process.env.JWT_SECRET, { expiresIn: "1d" });

      return res
        .status(200)
        .json({ message: `Login successful ${user.name}`, token, user, success: true });

    }
    
  } catch (error) {
    
  }
}