import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected Successfully!');
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}
export default connectDB;