import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.get('/', (_, res) => {
    res.send("API Running!");
});

app.get('/api', (_, res) => {
    res.send("Route to api!");
});

connectDB()
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Server running on PORT: ${PORT}`);
        })
    }
)