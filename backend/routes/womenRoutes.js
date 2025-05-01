const express = require('express');
const multer = require('multer');
const { Sarees, Kurtis, Tops, Trousers } = require('../models/Women');
const router = express.Router();

// Set up multer storage to handle image uploads as buffer (no file system storage)
const storage = multer.memoryStorage(); // This will store the file in memory as a Buffer
const upload = multer({ storage });

const models = {
  sarees: Sarees,
  kurtis: Kurtis,
  tops: Tops,
  trousers: Trousers,
};

// Add a new item to a subcategory (image stored as buffer in MongoDB)
router.post('/add/:subcategory', upload.single('image'), async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const { name, description, price, category } = req.body;

    // Store image as Buffer in MongoDB
    const newItem = new Model({
      title: name,
      description,
      price,
      category,
      image: req.file.buffer, // Store the image as a Buffer
    });

    await newItem.save();
    res.status(201).json({ message: `${subcategory} item added successfully!`, item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});




/**
 * Fetch all items from a subcategory (e.g., Sarees)
 */
// Fetch an item by ID and convert its image buffer to base64 string
// Add this route to your women.js file
// This will fetch all items from a subcategory with proper image handling

router.get('/fetch/:subcategory', async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];

  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const items = await Model.find();
    
    // Convert each item's image buffer to base64
    const itemsWithBase64Images = items.map(item => {
      // Convert Buffer to base64 string
      const base64Image = item.image 
        ? `data:image/jpeg;base64,${item.image.toString('base64')}` 
        : null;
        
      // Return item with converted image
      return {
        _id: item._id,
        name: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: base64Image
      };
    });

    res.status(200).json({ items: itemsWithBase64Images });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});
/**
 * Fetch a single item by ID
 */
router.get('/fetch/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * Delete item by ID
 */
router.delete('/delete/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const deletedItem = await Model.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: `${subcategory} item deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * Update item by ID
 */
router.put('/update/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const updatedItem = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: `${subcategory} item updated successfully!`, item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
