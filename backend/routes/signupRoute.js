const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Don't hash the password here - let the pre-save hook handle it
    user = new User({
      email: normalizedEmail,
      password: password // Plain password - will be hashed by pre-save hook
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      email: user.email,
      token
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;