import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectToDatabase from "../db/db.js";
import userModel from "../models/user.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectToDatabase();

    const existingUser = await userModel.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log(" Admin user already exists. Skipping registration.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin", 10);

    const newUser = new userModel({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    console.log(" Admin user registered successfully");
  } catch (error) {
    console.error(" Error seeding admin user:", error.message);
  } finally {
    process.exit();
  }
};

seedAdmin();