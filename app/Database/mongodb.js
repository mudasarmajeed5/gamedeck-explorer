import mongoose from "mongoose";
const connectDB = async()=>{
    if (mongoose.connections[0].readyState){
        console.log("Already connected to MONGODB");
        return;
    }
    try {
        if(!process.env.MONGO_URI){
            throw new Error("Mongodb URI is not defined in Environment variables");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected at: ',conn.connection.host)
    } catch (error) {
        console.log("Error connecting to database: ",error);
    }
}
export default connectDB;