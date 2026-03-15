const mongoose = require('mongoose');
const { getDatabase } = require('../config/db');

const accessoriesDB = getDatabase("Accessories");

const AccessoriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image1: { type: String, required: true, maxlength: 5000000 },
  image2: { type: String, required: false, maxlength: 5000000 },
  image3: { type: String, required: false, maxlength: 5000000 },
}, { timestamps: true });

const Earrings = accessoriesDB.model('Earrings', AccessoriesSchema, 'earrings');
const Necklaces = accessoriesDB.model('Necklaces', AccessoriesSchema, 'necklaces');
const Rings = accessoriesDB.model('Rings', AccessoriesSchema, 'rings');
const Bracelets = accessoriesDB.model('Bracelets', AccessoriesSchema, 'bracelets');
const Watches = accessoriesDB.model('Watches', AccessoriesSchema, 'watches');

module.exports = { Earrings, Necklaces, Rings, Bracelets, Watches };