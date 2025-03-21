const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const singupRoutes=require("./routes/signupRoute");
const loginRoutes=require("./routes/loginRoute");
const session = require("express-session");
const passport = require("passport");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// Middleware for sessions (required for Passport.js)
app.use(session({
    secret:process.env.MY_SECRET_KEY, // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes *after* session and passport middleware
app.use("/auth", authRoutes);
app.use("/signup",singupRoutes);
app.use("/login",loginRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
