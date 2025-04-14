import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//export function that connect to db
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connected to mongoDB');
    })
    .catch(()=>{
        console.log('Error connecting to MongoDB')
    });
};

export default connectDB;