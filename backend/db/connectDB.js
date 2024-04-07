import  mongoose  from "mongoose";

const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Db connected');
        
    } catch (error) {
        console.log('Unable to collect',error.message);
    }

}

export default connectDB