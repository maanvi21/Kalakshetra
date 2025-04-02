const express = require('express');
const { Shirts, Trousers, Jackets, Shoes } = require('../models/Men');
const router = express.Router();

// Map categories to their respective models
const modelMap = {
    'shirts': Shirts,
    'trousers': Trousers,
    'jackets': Jackets,
    'shoes': Shoes
};

// Middleware to get the correct model
const getModel = (req, res, next) => {
    const category = req.params.category.toLowerCase();
    if (!modelMap[category]) {
        return res.status(400).json({ message: 'Invalid category' });
    }
    req.Model = modelMap[category];
    next();
};

// GET all items in a category
router.get('/:category', getModel, async (req, res) => {
    try {
        const items = await req.Model.find().sort({ createdAt: -1 });
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST a new item to a category
router.post('/:category', getModel, async (req, res) => {
    try {
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new req.Model({ title, description, image });
        const savedItem = await newItem.save();
        res.status(201).json({ item: savedItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE an item from a category
router.delete('/:category/:id', getModel, async (req, res) => {
    try {
        const deletedItem = await req.Model.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;