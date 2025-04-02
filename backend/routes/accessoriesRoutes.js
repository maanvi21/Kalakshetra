const express = require('express');
const { Earrings, Necklaces, Rings, Bracelets, Watches } = require('../models/Accessories');
const router = express.Router();

// POST route to create a new item in a specific collection
router.post('/:category', async (req, res) => {
    try {
        // Destructure request body and category from params
        const { title, description, image } = req.body;
        const { category } = req.params;

        // Validate required fields
        if (!title || !description || !image) {
            return res.status(400).json({ 
                message: 'Title, description, and image are required' 
            });
        }

        // Select the appropriate model based on category
        let Model;
        switch(category.toLowerCase()) {
            case 'earrings':
                Model = Earrings;
                break;
            case 'necklaces':
                Model = Necklaces;
                break;
            case 'rings':
                Model = Rings;
                break;
            case 'bracelets':
                Model = Bracelets;
                break;
            case 'watches':
                Model = Watches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category. Choose earrings, necklaces, rings, bracelets, or watches' 
                });
        }

        // Create new item
        const newItem = new Model({
            title,
            description,
            image
        });

        // Save the item to the database
        const savedItem = await newItem.save();

        // Respond with the created item
        res.status(201).json({
            message: `${category} item created successfully`,
            item: savedItem
        });

    } catch (error) {
        console.error(`Error creating ${req.params.category} item:`, error);
        res.status(500).json({ 
            message: 'Server error while creating item', 
            error: error.message 
        });
    }
});

// GET route to fetch items from a specific collection
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10 } = req.query;

        // Select the appropriate model based on category
        let Model;
        switch(category.toLowerCase()) {
            case 'earrings':
                Model = Earrings;
                break;
            case 'necklaces':
                Model = Necklaces;
                break;
            case 'rings':
                Model = Rings;
                break;
            case 'bracelets':
                Model = Bracelets;
                break;
            case 'watches':
                Model = Watches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category. Choose earrings, necklaces, rings, bracelets, or watches' 
                });
        }

        // Pagination calculation
        const skip = (page - 1) * limit;

        // Fetch items with pagination
        const items = await Model.find()
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });  // Sort by most recent first

        // Count total items for pagination info
        const totalItems = await Model.countDocuments();

        res.status(200).json({
            items,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems
        });
    } catch (error) {
        console.error(`Error fetching ${req.params.category} items:`, error);
        res.status(500).json({ 
            message: 'Server error while fetching items', 
            error: error.message 
        });
    }
});

// Optional: GET route to fetch a single item by ID
router.get('/:category/:id', async (req, res) => {
    try {
        const { category, id } = req.params;

        // Select the appropriate model based on category
        let Model;
        switch(category.toLowerCase()) {
            case 'earrings':
                Model = Earrings;
                break;
            case 'necklaces':
                Model = Necklaces;
                break;
            case 'rings':
                Model = Rings;
                break;
            case 'bracelets':
                Model = Bracelets;
                break;
            case 'watches':
                Model = Watches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category' 
                });
        }

        // Find the item by ID
        const item = await Model.findById(id);

        if (!item) {
            return res.status(404).json({ 
                message: 'Item not found' 
            });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(`Error fetching ${req.params.category} item:`, error);
        res.status(500).json({ 
            message: 'Server error while fetching item', 
            error: error.message 
        });
    }
});

module.exports = router;