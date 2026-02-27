import express from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }


    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();


    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ success: false, error: 'Server error while creating user' });
  }
});

export default router;