const express = require('express');
const { Sarees, Kurtis, Tops, Trousers } = require('../models/Women');
const router = express.Router();

const models = {
    sarees: Sarees,
    kurtis: Kurtis,
    tops: Tops,
    trousers: Trousers
  };
  

// Generic route to handle different subcategories
router.post('/add/:subcategory', async (req, res) => {
    const { subcategory } = req.params.toLowerCase();
    const Model = models[subcategory];
    if (!Model) {
        return res.status(400).json({ error: 'Invalid subcategory' });
      }

      try {
        const newItem = new Model(req.body);
        await newItem.save();
        res.status(201).json({ message: `${subcategory} item added successfully!`, item: newItem });
      }catch(error){
        return res.status(500).json({ error: 'Server error', message: error.message });
      }
}


);  

// to fetch all items
router.get('/fetch/:subcategory', async (req, res) => {
    const { subcategory } = req.params.toLowerCase();
    const Model = models[subcategory];
    if (!Model) {
        return res.status(400).json({ error: 'Invalid subcategory' });
      }

      try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.status(200).json({ items });
      }catch(error){
        return res.status(500).json({ error: 'Server error', message: error.message });
      }
}
);

//  to delete an item
router.delete('/delete/:subcategory/:id', async (req, res) => {
    const { subcategory, id } = req.params;
    const Model = models[subcategory];
    if (!Model) {
        return res.status(400).json({ error: 'Invalid subcategory' });
      }

      try {
        const deletedItem = await Model.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
          }
          res.status(200).json({ message: `${subcategory} item deleted successfully!` });
      }catch(error){
        return res.status(500).json({ error: 'Server error', message: error.message });
      }
}
);
//  to update an item
router.put('/update/:subcategory/:id', async (req, res) => {
    const { subcategory, id } = req.params;
    const Model = models[subcategory];
    if (!Model) {
        return res.status(400).json({ error: 'Invalid subcategory' });
      }

      try {
        const updatedItem = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
          }
          res.status(200).json({ message: `${subcategory} item updated successfully!`, item: updatedItem });
      }catch(error){
        return res.status(500).json({ error: 'Server error', message: error.message });
      }
}
);
//  to fetch a single item
router.get('/fetch/:subcategory/:id', async (req, res) => {
    const { subcategory, id } = req.params;
    const Model = models[subcategory];
    if (!Model) {
        return res.status(400).json({ error: 'Invalid subcategory' });
      }

      try {
        const item = await Model.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
          }
          res.status(200).json({ item });
      }catch(error){
        return res.status(500).json({ error: 'Server error', message: error.message });
      }
}
);

module.exports = router;