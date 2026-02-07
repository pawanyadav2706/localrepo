// ...existing code...
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mysecret", {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // normalize input
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    password = password || "";

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create token
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Login body:", req.body);
    let { email, password } = req.body;
    email = (email || "").trim().toLowerCase();
    password = password || "";

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);
    return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Error while logging in", error: err.message });
  }
};
