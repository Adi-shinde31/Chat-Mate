import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message: "Unauthorized - No Token Provided!"
            });
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decodedToken){
            return res.status(401).json({
                message: "Unauthorized - Invalid Token!"
            });
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if(!user){
            return res.status(401).json({
                message: "Unauthorized - User not found!"
            });
        }

        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
}