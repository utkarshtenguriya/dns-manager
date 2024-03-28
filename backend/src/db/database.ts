import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        console.log(`${process.env.DB_URI}/${DB_NAME}`);

        const connectionInstance = await mongoose.connect(
            `${process.env.DB_URI}/${DB_NAME}`
            
        );
        console.log( 
            `🍃MongoDB connected successfully!!! DB Host: ${connectionInstance.connection.host}`
        ); 
        
    } catch (err) {
        console.error("❌ Database connection failed...");
        process.exit(1); 
    }
};

export default connectDB;