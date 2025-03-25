const mongoose = require('mongoose');

// Define Schema
const MenSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true } 
}, { timestamps: true });

// Create models for each collection
const Shirts = mongoose.model('Shirts', MenSchema, 'shirts'); 
const Trousers = mongoose.model('Trousers', MenSchema, 'trousers'); 

module.exports = { Shirts, Trousers };
