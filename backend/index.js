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
app.set("trust proxy", 1);

/* 3️⃣ Connect to MongoDB before anything else */
connectDB();

/* 4️⃣ CORS (run before session so pre‑flight requests work) */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://kalakshetra-five.vercel.app"
      // optionally also: `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* 5️⃣ Body parser */
app.use(express.json());

/* 6️⃣ Single, persistent session store */
app.use(
  session({
    secret: process.env.MY_SECRET_KEY || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "none"
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions"
    })
  })
);

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