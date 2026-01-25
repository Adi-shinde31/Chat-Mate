import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import { generateToken } from '../lib/utils.js';

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

}