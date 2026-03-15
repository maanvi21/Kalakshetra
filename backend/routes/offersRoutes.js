const express = require('express');
const multer = require('multer');
const { Offer } = require('../models/Offers');
const router = express.Router();

// ── Multer (memory storage for base64 conversion) ──────────────────────────
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
});

// Helper: file buffer → base64 data URI
const toBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

// Helper: format a document for the frontend
const formatOffer = (offer) => ({
  _id:         offer._id,
  title:       offer.title,
  description: offer.description,
  badge:       offer.badge,
  image:       offer.image,
  active:      offer.active,
  createdAt:   offer.createdAt,
  updatedAt:   offer.updatedAt,
});

// ── Routes ─────────────────────────────────────────────────────────────────

/**
 * GET /offers
 * Fetch all offers (active + inactive) — used by admin
 */
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json({ offers: offers.map(formatOffer) });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * GET /offers/active
 * Fetch only active offers — used by the public homepage
 */
router.get('/active', async (req, res) => {
  try {
    const offers = await Offer.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ offers: offers.map(formatOffer) });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * GET /offers/:id
 * Fetch single offer by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.status(200).json({ offer: formatOffer(offer) });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * POST /offers/add
 * Create a new offer
 * Accepts multipart/form-data with optional image file OR image URL in body
 */
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description, badge, active, imageUrl } = req.body;

    if (!title || !description)
      return res.status(400).json({ error: 'title and description are required' });

    // Image priority: uploaded file > imageUrl string
    let image;
    if (req.file) {
      image = toBase64(req.file);
    } else if (imageUrl && imageUrl.trim()) {
      image = imageUrl.trim();
    } else {
      return res.status(400).json({ error: 'An image file or image URL is required' });
    }

    const newOffer = new Offer({
      title,
      description,
      badge:  badge  || 'NEW',
      image,
      active: active === undefined ? true : active === 'true' || active === true,
    });

    await newOffer.save();
    res.status(201).json({
      message: 'Offer created successfully!',
      offer: formatOffer(newOffer),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * PUT /offers/update/:id
 * Update an existing offer
 * New image file replaces old one; if no file sent, keeps existing image
 * unless a new imageUrl is provided
 */
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });

    const { title, description, badge, active, imageUrl } = req.body;

    // Resolve image: new file > new URL > keep existing
    let image = offer.image;
    if (req.file) {
      image = toBase64(req.file);
    } else if (imageUrl && imageUrl.trim()) {
      image = imageUrl.trim();
    }

    const updateData = {
      title:       title       || offer.title,
      description: description || offer.description,
      badge:       badge       || offer.badge,
      image,
      active: active === undefined
        ? offer.active
        : active === 'true' || active === true,
    };

    const updated = await Offer.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.status(200).json({
      message: 'Offer updated successfully!',
      offer: formatOffer(updated),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * PATCH /offers/toggle/:id
 * Toggle active/inactive status only
 */
router.patch('/toggle/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });

    offer.active = !offer.active;
    await offer.save();

    res.status(200).json({
      message: `Offer ${offer.active ? 'activated' : 'deactivated'} successfully!`,
      offer: formatOffer(offer),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

/**
 * DELETE /offers/delete/:id
 * Delete an offer
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });

    res.status(200).json({ message: 'Offer deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = router;