const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const signupRoutes = require("./routes/signupRoute");
const loginRoutes = require("./routes/loginRoute");
const session = require("express-session");
const passport = require("passport");
const { connectDB } = require("./config/db");

// Load environment variables & ensure .env is correctly loaded
dotenv.config({ path: __dirname + "/.env" });

// Debugging: Check if critical env variables are loaded
console.log("🔍 Checking environment variables...");
console.log("PORT:", process.env.PORT || "NOT LOADED");
console.log("MY_SECRET_KEY:", process.env.MY_SECRET_KEY ? "✅ Loaded" : "❌ NOT LOADED");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT LOADED");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ NOT LOADED");

// Connect to MongoDB
connectDB();
//  // Select different databases
//  const menDB = getDatabase("Men");
//  const womenDB = getDatabase("Women");
//  const accessoriesDB = getDatabase("Accessories");
//  const bagsDB= getDatabase("Bags");
 
//  console.log("💡 Using Men Database:", menDB.name);
//     console.log("💡 Using Women Database:", womenDB.name);
//     console.log("💡 Using Accessories Database:", accessoriesDB.name);
//     console.log("💡 Using Bags Database:", bagsDB.name);


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware for sessions (required for Passport.js)
app.use(
    session({
        secret: process.env.MY_SECRET_KEY || "default_secret", // Ensure a fallback secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to `true` if using HTTPS
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes *after* session and passport middleware
app.use("/auth", authRoutes);
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
