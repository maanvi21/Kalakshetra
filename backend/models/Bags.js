const mongoose = require('mongoose');
const { getDatabase } = require('../config/db');

const bagsDB = getDatabase("Bags");

const BagsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image1: { type: String, required: true, maxlength: 5000000 },
  image2: { type: String, required: false, maxlength: 5000000 },
  image3: { type: String, required: false, maxlength: 5000000 },
}, { timestamps: true });

const Handbags = bagsDB.model('Handbags', BagsSchema, 'handbags');
const Backpacks = bagsDB.model('Backpacks', BagsSchema, 'backpacks');
const Wallets = bagsDB.model('Wallets', BagsSchema, 'wallets');
const Totes = bagsDB.model('Totes', BagsSchema, 'totes');
const Clutches = bagsDB.model('Clutches', BagsSchema, 'clutches');

module.exports = { Handbags, Backpacks, Wallets, Totes, Clutches };