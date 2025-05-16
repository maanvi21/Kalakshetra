const mongoose = require('mongoose');
const { getDatabase } = require('../config/db'); // Import the getDatabase function

// Get the Women database
const womenDB = getDatabase("Women");

// Define Schema
const WomenSchema = new mongoose.Schema({
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
 

// Create models for specific collections inside the "Women" database
const Sarees = womenDB.model('Sarees', WomenSchema, 'sarees');
const Kurtis = womenDB.model('Kurtis', WomenSchema, 'kurtis');
const Tops = womenDB.model('Tops', WomenSchema, 'tops');
const Trousers = womenDB.model('Trousers', WomenSchema, 'trousers');

// Export models
module.exports = { Sarees, Kurtis, Tops, Trousers };
