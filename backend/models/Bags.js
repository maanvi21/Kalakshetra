const mongoose = require('mongoose');
const { getDatabase } = require('../config/db'); // Import getDatabase function

// Get the Bags database
const bagsDB = getDatabase("Bags");

// Define Schema
const BagsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price:{ type: Number, required: true },
   // Primary image (required)
    image1: {
        type: String,
        required: true,
        maxlength: 5000000 // Allows large enough size for Base64 images
    },
    // Optional additional images
    image2: {
        type: String,
        required: false,
        maxlength: 5000000
    },
    image3: {
        type: String,
        required: false,
        maxlength: 5000000
    }
}, { timestamps: true });

// Create models for specific collections inside the "Bags" database
const Handbags = bagsDB.model('Handbags', BagsSchema, 'handbags');
const Backpacks = bagsDB.model('Backpacks', BagsSchema, 'backpacks');
const Wallets = bagsDB.model('Wallets', BagsSchema, 'wallets');
const Totes = bagsDB.model('Totes', BagsSchema, 'totes');
const Clutches = bagsDB.model('Clutches', BagsSchema, 'clutches');

// Configure Mongoose settings
mongoose.set('bufferCommands', false);

/**
 * Optional function to insert sample data for testing
 */
async function insertSampleData() {
    const { connectDB } = require('../config/db');
    await connectDB();
    try {
        // Example base64 image (this is just a placeholder - would be a real base64 string in production)
        const sampleBase64Image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9EtM1vUb0SNHMY/LbaAVHGawfF3irX9LsJmt5C0mRtUKvX8q2vB//AB4H/fNc78Qf+QTH/wBdB/I18vQpJ42/Y+qxFVrBL1PmrxDr/i+71aaS3vJoYC5McYx8o9PavpfwprravoVveuu0uDkD0II/pXxp8WNPe2e3mWRsEFCM9Oc/0r7D8H/8i1p//XBP5V72eYWFOFNxXVnzuUYqdWdRSfRH/9k=";

        const newHandbag = new Handbags({
            title: "Elegant Leather Handbag",
            description: "A stylish and elegant leather handbag for all occasions.",
            image: sampleBase64Image
        });
        
        await newHandbag.save();
        console.log("✅ Sample handbag inserted successfully!");
        mongoose.connection.close(); // Close connection after inserting
    } catch (error) {
        console.error("❌ Error inserting document:", error);
    }
}

// To insert sample data, uncomment the line below
// insertSampleData();

module.exports = { Handbags, Backpacks, Wallets, Totes, Clutches };