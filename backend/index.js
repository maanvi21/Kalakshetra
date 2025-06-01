const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');  
// Routes (make sure Passport config is loaded before these)
require("./config/passport"); // ← ✅ Load Passport strategy

// 1️⃣ Only load .env locally — Render injects env vars for you
if (process.env.NODE_ENV !== 'production') {

dotenv.config({ path: __dirname + "/.env" });    // simpler path handling
}


// Load MongoDB connection
const { connectDB } = require("./config/db");

// Debugging: Check env variables
console.log("🔍 Checking environment variables...");
console.log("PORT:", process.env.PORT || "NOT LOADED");
console.log("MY_SECRET_KEY:", process.env.MY_SECRET_KEY ? "✅ Loaded" : "❌ NOT LOADED");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT LOADED");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ NOT LOADED");


const app = express();

/* 2️⃣ Trust Render’s reverse proxy so secure cookies work */
app.set('trust proxy', 1);
// Connect to MongoDB before anything else
connectDB(); // ← 🔥 THIS WAS MISSING

// Middleware
// CORS setup - Make sure this is correctly configured
app.use(cors({
    origin: ["http://localhost:3000", "https://kalakshetra3.vercel.app"], // Add any client URLs
    credentials: true, // Important for cookies/auth
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json());

// Session middleware
app.use(
    session({
        secret: process.env.MY_SECRET_KEY || "default_secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());



app.use("/auth", require("./routes/authRoutes"));
app.use("/signup", require("./routes/signupRoute"));
app.use("/login", require("./routes/loginRoute"));
app.use("/men", require("./routes/menRoutes"));
app.use("/women", require("./routes/womenRoutes"));
app.use("/accessories", require("./routes/accessoriesRoutes"));
app.use("/bags", require("./routes/bagsRoutes"));

// 404 route handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));