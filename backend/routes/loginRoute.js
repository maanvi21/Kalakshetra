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
    console.log("🔑 Entered Password:", password);

    if (!email || !password) {
      console.log("⚠️ Missing Fields!");
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ email });
    console.log("🟢 User Found in DB:", user);

    if (!user) {
      console.log("❌ User Not Found!");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("🔐 Stored Hashed Password:", user.password);

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password Mismatch!");
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login Successful!");
    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
