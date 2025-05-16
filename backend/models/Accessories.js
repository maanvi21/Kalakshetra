const mongoose = require('mongoose');
const { getDatabase } = require('../config/db'); // Import getDatabase function

// Get the Accessories database
const accessoriesDB = getDatabase("Accessories");

// Define Schema
const AccessoriesSchema = new mongoose.Schema({
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


// Create models for specific collections inside the "Accessories" database
const Earrings = accessoriesDB.model('Earrings', AccessoriesSchema, 'earrings');
const Necklaces = accessoriesDB.model('Necklaces', AccessoriesSchema, 'necklaces');
const Rings = accessoriesDB.model('Rings', AccessoriesSchema, 'rings');
const Bracelets = accessoriesDB.model('Bracelets', AccessoriesSchema, 'bracelets');
const Watches = accessoriesDB.model('Watches', AccessoriesSchema, 'watches');

// Export models
module.exports = { Earrings, Necklaces, Rings, Bracelets, Watches };
