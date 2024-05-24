import mongoose from "mongoose";
import { DATABASE_URL } from "../example.env";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL!);
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
    setTimeout(connectDB, 500);
  }
};

export default connectDB;
