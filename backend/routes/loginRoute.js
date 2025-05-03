const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login Request Received");
    console.log("📧 Email:", email);

    if (!email || !password) {
      console.log("⚠️ Missing Fields!");
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    console.log("🔍 User Found in DB:", user ? "Yes" : "No");

    if (!user) {
      console.log("❌ User Not Found!");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password Mismatch!");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    console.log("✅ Login Successful!");
    return res.status(200).json({ 
      message: "Login successful", 
      token,
      email: user.email 
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;