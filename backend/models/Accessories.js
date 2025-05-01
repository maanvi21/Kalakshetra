const mongoose = require('mongoose');
const { getDatabase } = require('../config/db'); // Import getDatabase function

// Get the Accessories database
const accessoriesDB = getDatabase("Accessories");

// Define Schema
const AccessoriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price:{ type: Number, required: true },
    image: { 
        type: String, 
        required: true,
        // Increased max size to accommodate Base64 images
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
