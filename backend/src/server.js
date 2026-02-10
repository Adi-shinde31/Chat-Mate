import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { io, server, app } from './lib/socket.js';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
}))
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

app.get('/', (_, res) => {
    res.send("API Running!");
});

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed ❌");
        console.error(error.message);
        process.exit(1);
    });