const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model
require("../config/passport"); // Import Passport configuration

const router = express.Router();

// Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback Route
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            // req.user.email is from passport.js
            let user = await User.findOne({ email: req.user.email });

            if (!user) {
                user = new User({
                    name: req.user.displayName,
                    email: req.user.email,
                    password: "google-auth" // Placeholder password
                });
                await user.save();
            }

            // Generate JWT Token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Google Auth Error:", error);
            res.status(500).json({ message: "Server Error" });
        }
    }
);

module.exports = router;
