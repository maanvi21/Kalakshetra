const mongoose = require('mongoose');
const { getDatabase } = require('../config/db');

const menDB = getDatabase("Men");

const MenSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image1: { type: String, required: true, maxlength: 5000000 },
  image2: { type: String, required: false, maxlength: 5000000 },
  image3: { type: String, required: false, maxlength: 5000000 },
}, { timestamps: true });

const Shirts = menDB.model('Shirts', MenSchema, 'shirts');
const Trousers = menDB.model('Trousers', MenSchema, 'trousers');
const Jackets = menDB.model('Jackets', MenSchema, 'jackets');
const Shoes = menDB.model('Shoes', MenSchema, 'shoes');

module.exports = { Shirts, Trousers, Jackets, Shoes };