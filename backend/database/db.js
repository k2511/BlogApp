import mongoose from "mongoose";
import "dotenv/config";

const connectionDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connection Successfully ✅");
    
  } catch (error) {
    console.log("MongoDB Connection failed ❌", error);
  }
};


export default connectionDB;