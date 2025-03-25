const mongoose = require('mongoose');

// Define Schema
const AccessoriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true } 
}, { timestamps: true });

// Create models for each collection
const Earrings = mongoose.model('Earrings', AccessoriesSchema, 'earrings'); 
const Necklaces = mongoose.model('Necklaces', AccessoriesSchema, 'necklaces'); 
const Rings = mongoose.model('Rings', AccessoriesSchema, 'rings'); 

module.exports = { Earrings, Necklaces,Rings };
