const mongoose = require('mongoose');

// Define Schema
const WomenSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true } 
}, { timestamps: true });

// Create models for each collection
const Sarees = mongoose.model('Shirts', WomenSchema, 'sarees'); 
const Kurtis = mongoose.model('Trousers', WomenSchema, 'kurtis'); 
const Tops = mongoose.model('Shirts', WomenSchema, 'tops'); 
const Trousers = mongoose.model('Trousers', WomenSchema, 'trousers'); 
module.exports = { Sarees,Kurtis,Tops, Trousers };
