const express = require('express');
const multer = require('multer');
const { Handbags, Backpacks, Clutches, Totes, Wallets } = require('../models/Bags');
const router = express.Router();

const models = {
  handbags: Handbags,
  backpacks: Backpacks,
  clutches: Clutches,
  totes: Totes,
  wallets: Wallets,
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});

const imageFields = [
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
];

const toBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

const formatItem = (item) => ({
  _id: item._id,
  name: item.title,
  description: item.description,
  price: item.price,
  category: item.category,
  image1: item.image1,
  image2: item.image2 || null,
  image3: item.image3 || null,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

/**
 * POST /bags/add/:subcategory
 */
router.post('/add/:subcategory', upload.fields(imageFields), async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });
  if (!req.files || !req.files.image1)
    return res.status(400).json({ error: 'Primary image (image1) is required' });

  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price)
      return res.status(400).json({ error: 'name, description and price are required' });

    const newItem = new Model({
      title: name,
      description,
      price: parseFloat(price),
      image1: toBase64(req.files.image1[0]),
      image2: req.files.image2 ? toBase64(req.files.image2[0]) : undefined,
      image3: req.files.image3 ? toBase64(req.files.image3[0]) : undefined,
      category,
    });

    await newItem.save();
    res.status(201).json({
      message: `${subcategory} item added successfully!`,
      item: formatItem(newItem),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * GET /bags/fetch/:subcategory
 */
router.get('/fetch/:subcategory', async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const items = await Model.find().sort({ createdAt: -1 });
    res.status(200).json({ items: items.map(formatItem) });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * GET /bags/fetch/:subcategory/:id
 */
router.get('/fetch/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.status(200).json({ item: formatItem(item) });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * DELETE /bags/delete/:subcategory/:id
 */
router.delete('/delete/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const item = await Model.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.status(200).json({ message: `${subcategory} item deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * PUT /bags/update/:subcategory/:id
 */
router.put('/update/:subcategory/:id', upload.fields(imageFields), async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const updateData = {
      title: req.body.name || item.title,
      description: req.body.description || item.description,
      price: req.body.price ? parseFloat(req.body.price) : item.price,
      category: req.body.category || item.category,
      image1: req.files?.image1 ? toBase64(req.files.image1[0]) : item.image1,
      image2: req.files?.image2 ? toBase64(req.files.image2[0]) : item.image2,
      image3: req.files?.image3 ? toBase64(req.files.image3[0]) : item.image3,
    };

    const updatedItem = await Model.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: `${subcategory} item updated successfully!`,
      item: formatItem(updatedItem),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;