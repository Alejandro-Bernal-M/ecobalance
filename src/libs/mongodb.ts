import { error } from "console";
import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if(!MONGO_URI){
  throw new Error("MONGO_URI should be defined")
}

export const connectDB = async () => {
  try {
    const  {connection} = await mongoose.connect(MONGO_URI)
    if(connection.readyState === 1){
      console.log('mongodb connected');
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }

}