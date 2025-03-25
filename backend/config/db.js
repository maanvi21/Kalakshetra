const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
// Function to get a specific database
const getDatabase = (dbName) => {
    return mongoose.connection.useDb(dbName); // Ensure this function is exported properly
};
module.exports = { connectDB, getDatabase };

