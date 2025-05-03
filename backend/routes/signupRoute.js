const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Signup Request Received");
    console.log("📧 Email:", email);
    
    if (!email || !password) {
      console.log("⚠️ Missing Fields!");
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ User Already Exists!");
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("✅ User Created Successfully!");
    
    // Generate JWT token for automatic login after signup
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    return res.status(201).json({ 
      message: "User created successfully", 
      token,
      email: user.email
    });

  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;