import { User } from "../models/User.js";
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
        let user = await User.findOne({ email });
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
            .json({ message: `Welcome Back `, user, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logout out successfully", success: true })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req,res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        //  cloudinary 


        // Skills
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware Authentication 

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User Not found", success: false })
        }
        // Update user
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // for  resume 

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({ message: "Profile updated successfully.", user, success: true })
    } catch (error) {
        console.log(error)
    }
}