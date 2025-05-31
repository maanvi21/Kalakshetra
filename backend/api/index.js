const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// Load environment variables from backend folder
dotenv.config({ path: path.join(__dirname, "../.env") });

// Initialize Express app
const app = express();

// Global error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

// Environment variables validation
console.log("🔍 Environment Variables Check:");
console.log("PORT:", process.env.PORT || "NOT LOADED");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ NOT LOADED");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT LOADED");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ NOT LOADED");

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://kalakshetra3.vercel.app"]
    : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
}));

// Database connection with error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    // Adjust path to config folder
    const { connectDB: dbConnect } = require("../config/db");
    await dbConnect();
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

// Load Passport configuration
try {
  require("../config/passport");
} catch (error) {
  console.error("❌ Passport configuration error:", error);
}

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Kalakshetra API is running", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes with error handling - adjust paths to backend folder
const routes = [
  { path: "/api", file: "../routes/index" },
  { path: "/auth", file: "../routes/authRoutes" },
  { path: "/signup", file: "../routes/signupRoute" },
  { path: "/login", file: "../routes/loginRoute" },
  { path: "/men", file: "../routes/menRoutes" },
  { path: "/women", file: "../routes/womenRoutes" },
  { path: "/accessories", file: "../routes/accessoriesRoutes" },
  { path: "/bags", file: "../routes/bagsRoutes" }
];

routes.forEach(({ path, file }) => {
  try {
    app.use(path, require(file));
    console.log(`✅ Route loaded: ${path}`);
  } catch (error) {
    console.error(`❌ Error loading route ${path}:`, error.message);
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found", 
    path: req.originalUrl,
    method: req.method 
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("❌ Global error handler:", error);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for serverless
module.exports = app;
module.exports.handler = serverless(app);