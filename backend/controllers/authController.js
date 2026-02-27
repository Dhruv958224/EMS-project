import jwt from 'jsonwebtoken';
import userModel from "../models/user.js";
import bcrypt from 'bcrypt';

async function login(req, res) {
  try {
    const { email, password } = req.body;


    console.log("Login attempt:", email, password);

    const user = await userModel.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, role: user.role }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user })
}

export { login, verify };