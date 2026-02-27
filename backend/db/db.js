import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("MONGO_URI not defined in .env");

    await mongoose.connect(MONGO_URI, {
      dbName: "emsDB",
    });

    console.log(` DB Connected Successfully at ${mongoose.connection.host}`);
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

export default connectToDatabase;