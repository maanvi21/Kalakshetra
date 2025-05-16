const express = require('express');
const multer = require('multer');
const { Shirts, Trousers, Jackets, Shoes } = require('../models/Men');
const router = express.Router();

// Subcategory models mapping
const models = {
  shirts: Shirts,
  trousers: Trousers,
  jackets: Jackets,
  shoes: Shoes
};

/// Configure multer for memory storage (not disk)
const storage = multer.memoryStorage();

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
router.post('/add/:subcategory', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },

]), async (req, res) => {
  const { subcategory } = req.params;
  const Model = models[subcategory.toLowerCase()];
  
  if (!Model) return res.status(400).json({ error: 'Invalid subcategory' });
  if (!req.files || !req.files.image1) return res.status(400).json({ error: 'Primary image (image1) is required' });

  try {
    const { name, description, price, category } = req.body;
    
    // Convert primary image to base64 (required)
    const base64Image1 = req.files.image1[0].buffer.toString('base64');
    const imageString1 = `data:${req.files.image1[0].mimetype};base64,${base64Image1}`;

    // Initialize the new item with required fields
    const newItem = new Model({
      title: name, // Map 'name' from frontend to 'title' in backend
      description,
      price,
      image1: imageString1, // Store primary image as base64 string
      category,
    });

    // Process optional images if they exist
    if (req.files.image2) {
      const base64Image2 = req.files.image2[0].buffer.toString('base64');
      newItem.image2 = `data:${req.files.image2[0].mimetype};base64,${base64Image2}`;
    }

    if (req.files.image3) {
      const base64Image3 = req.files.image3[0].buffer.toString('base64');
      newItem.image3 = `data:${req.files.image3[0].mimetype};base64,${base64Image3}`;
    }

   
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
      image1: item.image1, // Primary image
      image2: item.image2 || null, // Optional images
      image3: item.image3 || null,
      
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
      image1: item.image1, // Primary image
      image2: item.image2 || null, // Optional images
      image3: item.image3 || null,
      
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
router.put('/update/:subcategory/:id', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },

]), async (req, res) => {
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
      // FormData submission with possible new images
      updateData = {
        title: req.body.name || item.title,
        description: req.body.description || item.description,
        price: req.body.price || item.price,
        category: req.body.category || item.category,
      };
      
      // Process each image if updated
      if (req.files) {
        // Update primary image if provided
        if (req.files.image1) {
          const base64Image1 = req.files.image1[0].buffer.toString('base64');
          updateData.image1 = `data:${req.files.image1[0].mimetype};base64,${base64Image1}`;
        }
        
        // Update optional images if provided
        if (req.files.image2) {
          const base64Image2 = req.files.image2[0].buffer.toString('base64');
          updateData.image2 = `data:${req.files.image2[0].mimetype};base64,${base64Image2}`;
        }

        if (req.files.image3) {
          const base64Image3 = req.files.image3[0].buffer.toString('base64');
          updateData.image3 = `data:${req.files.image3[0].mimetype};base64,${base64Image3}`;
        }

       
      }
    } else {
      // JSON submission without image update
      updateData = {
        title: req.body.name || item.title,
        description: req.body.description || item.description,
        price: req.body.price || item.price,
        category: req.body.category || item.category,
        // Keep existing images
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
      image1: updatedItem.image1,
      image2: updatedItem.image2 || null,
      image3: updatedItem.image3 || null,

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