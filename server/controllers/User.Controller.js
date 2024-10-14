import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Please Fill all the form", success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist with this email", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,

        })
        return res.status(201).json({ message: 'Account created successfully', success: true })
    } catch (error) {
        console.log(error)
    }
}
export const signIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please Fill all the form", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials", success: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials", success: false,
            })
        };
        // for role 
        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role", success: false })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
            .json({ message: `Welcome Back ${fullname}`, user, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

// 1:11:01