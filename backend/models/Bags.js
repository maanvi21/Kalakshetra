const mongoose = require('mongoose');
const { getDatabase,connectDB } = require('../config/db'); // Import getDatabase function

// Get the Bags database
const bagsDB = getDatabase("Bags");

// Define Schema
const BagsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true } // Store as URL or base64 instead of Buffer
}, { timestamps: true });

// Create models for specific collections inside the "Bags" database
const Handbags = bagsDB.model('Handbags', BagsSchema, 'handbags');
const Backpacks = bagsDB.model('Backpacks', BagsSchema, 'backpacks');
const Wallets = bagsDB.model('Wallets', BagsSchema, 'wallets');
const Totes = bagsDB.model('Totes', BagsSchema, 'totes');
const Clutches = bagsDB.model('Clutches', BagsSchema, 'clutches');
mongoose.set('bufferCommands', false);

// dummy data 
async function insertSampleData() {
    await connectDB();
    try {
        const newHandbag = new Handbags({
            title: "Elegant Leather Handbag",
            description: "A stylish and elegant leather handbag for all occasions.",
            image: "https://example.com/handbag.jpg" // Replace with an actual image URL
        });

        await newHandbag.save();
        console.log("✅ Sample handbag inserted successfully!");
        mongoose.connection.close(); // Close connection after inserting
    } catch (error) {
        console.error("❌ Error inserting document:", error);
    }
}

// Insert dummy data
insertSampleData();
// Export models
module.exports = { Handbags, Backpacks, Wallets, Totes, Clutches };
