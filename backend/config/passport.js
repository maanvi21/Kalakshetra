const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config({ path: __dirname + "/../.env" });

// Debugging: Check if environment variables are loaded
console.log("🔍 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID || "NOT FOUND");
console.log("🔍 GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET || "NOT FOUND");

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google OAuth credentials. Check your .env file.");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: "google-auth" // Placeholder
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});