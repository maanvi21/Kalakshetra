const mongoose = require('mongoose');
const { getDatabase } = require('../config/db');

const offersDB = getDatabase('Offers');

const OfferSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  badge: {
    type: String,
    enum: ['HOT', 'NEW', 'FESTIVE', 'SALE', 'EXCLUSIVE', 'LIMITED'],
    default: 'NEW',
  },
  // Stores either a base64 data URI (uploaded file) or a plain URL string
  image:  { type: String, required: true, maxlength: 5000000 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Offer = offersDB.model('Offer', OfferSchema, 'offers');

module.exports = { Offer };