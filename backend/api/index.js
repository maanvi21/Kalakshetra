const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
// Routes (make sure Passport config is loaded before these)
require("./config/passport"); // ← ✅ Load Passport strategy

// Load environment variables
dotenv.config({ path: __dirname + "/.env" });

// Load MongoDB connection
const { connectDB } = require("./config/db");

// Debugging: Check env variables
console.log("🔍 Checking environment variables...");
console.log("PORT:", process.env.PORT || "NOT LOADED");
console.log("MY_SECRET_KEY:", process.env.MY_SECRET_KEY ? "✅ Loaded" : "❌ NOT LOADED");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT LOADED");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ NOT LOADED");


const app = express();

// Connect to MongoDB before anything else
connectDB(); // ← 🔥 THIS WAS MISSING

// Middleware
// CORS setup - Make sure this is correctly configured
app.use(cors({
    origin: ["https://kalakshetra3.vercel.app", "http://localhost:3000"], // Add any client URLs
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

// Apply middleware, routes, etc.
const routes = require('../backend/routes'); // adjust path as needed
app.use("/api", routes);

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


// ✅ Correct way for Vercel
const PORT = process.env.PORT || 5000;

// Only listen in development, not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;