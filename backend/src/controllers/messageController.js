import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import cloudinary from '../lib/cloudinary.js';

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (e) {
        console.error('Error in getUsersForSidebar', e.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {receiverId:userToChatId, senderId:myId}
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (e) {
        console.error('Error in getMessages', e.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Message must have text or image" });
        }

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (e) {
        console.error('Error in sendMessage', e.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}
