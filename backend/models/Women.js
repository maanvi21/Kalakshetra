const mongoose = require('mongoose');
const { getDatabase } = require('../config/db');

const womenDB = getDatabase("Women");

const WomenSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image1: { type: String, required: true, maxlength: 5000000 },
  image2: { type: String, required: false, maxlength: 5000000 },
  image3: { type: String, required: false, maxlength: 5000000 },
}, { timestamps: true });

const Sarees = womenDB.model('Sarees', WomenSchema, 'sarees');
const Kurtis = womenDB.model('Kurtis', WomenSchema, 'kurtis');
const Tops = womenDB.model('Tops', WomenSchema, 'tops');
const Trousers = womenDB.model('Trousers', WomenSchema, 'trousers');

module.exports = { Sarees, Kurtis, Tops, Trousers };