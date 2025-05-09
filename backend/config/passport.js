const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("📱 Google Auth Profile Received");
        
        const userEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        
        if (!userEmail) {
          console.log("❌ No email received from Google");
          return done(null, false);
        }
        
        // Return user data for the callback route
        const userData = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: userEmail,
          picture: profile.photos && profile.photos[0] ? profile.photos[0].value : null
        };
        
        console.log("✅ Google Auth User:", userEmail);
        return done(null, userData);
      } catch (error) {
        console.error("❌ Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;