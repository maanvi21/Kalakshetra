const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("../config/passport");
require("dotenv").config();

const router = express.Router();

// Google OAuth Login Route
router.get("/google", (req, res, next) => {
  console.log("📱 Google OAuth Request");
  
  // Get the redirectUrl from query params or use default
  const redirectUrl = req.query.redirectUrl || "http://localhost:3000/auth/callback";
  console.log("🔄 Redirect URL:", redirectUrl);
  
  // Store in session for use in callback
  req.session = req.session || {};
  req.session.redirectUrl = redirectUrl;
  
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    state: Buffer.from(JSON.stringify({ redirectUrl })).toString('base64')
  })(req, res, next);
});

// Google OAuth Callback Route
router.get("/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "/login",
    session: false 
  }),
  async (req, res) => {
    try {
      console.log("🔙 Google OAuth Callback");
      console.log("👤 User from Google:", req.user ? "Received" : "Missing");
      
      if (!req.user || !req.user.email) {
        console.log("❌ Invalid user data from Google");
        return res.redirect("http://localhost:3000/login?error=invalid_user");
      }
      
      // Get user email from OAuth
      const userEmail = req.user.email;
      console.log("📧 User Email:", userEmail);
      
      // Find or create user
      let user = await User.findOne({ email: userEmail });
      if (!user) {
        console.log("🆕 Creating new user from Google auth");
        user = new User({
          email: userEmail,
          password: "google-auth-" + Math.random().toString(36).substring(2),
          provider: "google"
        });
        await user.save();
      }
      
      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      console.log("🎟️ Token Generated");
      
      // Get redirect URL from session or state parameter or use default
      let redirectUrl = "http://localhost:3000/auth/callback";
      
      // Try to get from state parameter if available
      if (req.query.state) {
        try {
          const stateData = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
          if (stateData.redirectUrl) {
            redirectUrl = stateData.redirectUrl;
          }
        } catch (e) {
          console.error("❌ Failed to parse state parameter:", e);
        }
      }
      
      // Session takes precedence if available
      if (req.session && req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
      }
      
      console.log("🔄 Redirecting to:", redirectUrl);
      console.log("✅ Authentication Complete");
      
      // Redirect to frontend with token and email
      res.redirect(`${redirectUrl}?token=${token}&email=${encodeURIComponent(userEmail)}`);
    } catch (error) {
      console.error("❌ Google Auth Error:", error);
      res.redirect("http://localhost:3000/login?error=auth_failed");
    }
  }
);

module.exports = router;