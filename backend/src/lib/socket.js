import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.ALLOWED_ORIGIN],
    },
});

export function getReceiverSocketId(receiverId) {
    return userSockerMap[receiverId];
}

const userSockerMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSockerMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSockerMap));
    
    socket.on("disconnect", () => {
        delete userSockerMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSockerMap));
    });
});

export { io, server, app };