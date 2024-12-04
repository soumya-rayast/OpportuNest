import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import getDataUri from "../utils/daturi.js";
import cloudinary from "../utils/cloudinary.js";

export const signUp = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validate input fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        // File validation
        if (!req.file) {
            return res.status(400).json({ message: "Profile photo is required", success: false });
        }

        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check for existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered", success: false });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: { profilePhoto: cloudResponse.secure_url }
        });

        return res.status(201).json({ message: "Account created successfully", success: true, data: user });
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).
                json({
                    message: "Please Fill all the form",
                    success: false
                });
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
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
            .json({ message: `Welcome Back `, user, success: true })
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }

}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "lax" })
            .json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }

}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        //  cloudinary 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
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
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // for  resume 
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname
        }
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
        console.error("Error during sign-up:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}