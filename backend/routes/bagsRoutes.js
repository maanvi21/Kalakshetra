const express = require('express');
const multer = require('multer');

const { Handbags, Backpacks, Clutches, Totes, Wallets } = require('../models/Bags');

const router = express.Router();
const storage = multer.memoryStorage();


const models = {
  handbags: Handbags,
  backpacks: Backpacks,
  clutches: Clutches,
  totes: Totes,
  wallets: Wallets
};



// File filter to only accept images
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
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB limit
  }
});

/**
 * Add new item to a subcategory
 */
router.post('/add/:subcategory', upload.single('image'), async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];
  
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });
  if (!req.file) return res.status(400).json({ error: 'Image is required' });

  try {
    const { name, description, price, category } = req.body;
    
    // Convert image to base64
    const base64Image = req.file.buffer.toString('base64');
    const imageString = `data:${req.file.mimetype};base64,${base64Image}`;

    const newItem = new Model({
      title: name, // Map 'name' from frontend to 'title' in backend
      description,
      price,
      image: imageString, // Store as base64 string
      category,
    });

    await newItem.save();
    res.status(201).json({ 
      message: `${subcategory} item added successfully!`, 
      item: newItem 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * Fetch all items from a subcategory
 */
router.get('/fetch/:subcategory', async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];
  
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const items = await Model.find().sort({ createdAt: -1 });
    
    // Format the items for the frontend
    const formattedItems = items.map(item => ({
      _id: item._id,
      name: item.title, // Map 'title' from backend to 'name' in frontend
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image, // Base64 image
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
    
    res.status(200).json({ items: formattedItems });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * Fetch single item by ID
 */
router.get('/fetch/:subcategory/:id', async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];
  
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    // Format the item for the frontend
    const formattedItem = {
      _id: item._id,
      name: item.title, // Map 'title' from backend to 'name' in frontend
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image, // Base64 image
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    
    res.status(200).json({ item: formattedItem });
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
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    // Delete the item from the database
    await Model.findByIdAndDelete(id);
    
    res.status(200).json({ message: `${subcategory} item deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

/**
 * Update item by ID
 */
router.put('/update/:subcategory/:id', upload.single('image'), async (req, res) => {
  const { subcategory, id } = req.params;
  const Model = models[subcategory.toLowerCase()];
  
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });

  try {
    // Find the item first
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    // Check content type to determine how to parse the request
    const contentType = req.headers['content-type'] || '';
    let updateData;
    
    if (contentType.includes('multipart/form-data')) {
      // FormData submission with possible new image
      updateData = {
        title: req.body.name || item.title,
        description: req.body.description || item.description,
        price: req.body.price || item.price,
        category: req.body.category || item.category,
      };
      
      // If a new image was uploaded
      if (req.file) {
        // Convert new image to base64
        const base64Image = req.file.buffer.toString('base64');
        updateData.image = `data:${req.file.mimetype};base64,${base64Image}`;
      }
    } else {
      // JSON submission without image update
      updateData = {
        title: req.body.name || item.title,
        description: req.body.description || item.description,
        price: req.body.price || item.price,
        category: req.body.category || item.category,
        // Keep the existing image
      };
    }
    
    // Update the item
    const updatedItem = await Model.findByIdAndUpdate(id, updateData, { new: true });
    
    // Format the updated item for the frontend
    const formattedItem = {
      _id: updatedItem._id,
      name: updatedItem.title,
      description: updatedItem.description,
      price: updatedItem.price,
      category: updatedItem.category,
      image: updatedItem.image,
      createdAt: updatedItem.createdAt,
      updatedAt: updatedItem.updatedAt
    };
    
    res.status(200).json({ 
      message: `${subcategory} item updated successfully!`, 
      item: formattedItem 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;