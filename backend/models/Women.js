const mongoose = require('mongoose');
const { getDatabase } = require('../config/db'); // Import the getDatabase function

// Get the Women database
const womenDB = getDatabase("Women");

// Define Schema
const WomenSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String} // Store base64 string or URL instead of Buffer
}, { timestamps: true });

// Create models for specific collections inside the "Women" database
const Sarees = womenDB.model('Sarees', WomenSchema, 'sarees');
const Kurtis = womenDB.model('Kurtis', WomenSchema, 'kurtis');
const Tops = womenDB.model('Tops', WomenSchema, 'tops');
const Trousers = womenDB.model('Trousers', WomenSchema, 'trousers');

// Export models
module.exports = { Sarees, Kurtis, Tops, Trousers };
