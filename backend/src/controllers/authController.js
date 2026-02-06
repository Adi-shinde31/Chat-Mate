import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try{
        if(!fullName || !password || !email){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be atleast 6 characters!"
            });
        }
        
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                message: "User already exists!."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if(newUser){
            await newUser.save();
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })
        } else {
            return res.status(400).json({
                message: "Invalid user Data."
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(!password || !email){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Credentials!"
            });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 0});
        return res.status(200).json({
            message: "Logged Out Successfully!"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

export const updateProfile = async (req, res) => {
    const { profilePicture } = req.body;
    const userId = req.user._id;

    try{
        if(!profilePicture){
            return res.status(500).json({
                message: 'Profile Picture is required!'
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture: uploadResponse.secure_url}, {new:true});

        res.status(200).json(updatedUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        });
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    } catch (e) {
        console.error('Error in checkAuth controller', e.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}