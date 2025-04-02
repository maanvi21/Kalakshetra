const express = require('express');
const { Handbags, Backpacks, Wallets, Totes, Clutches } = require('../models/Bags');
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
            case 'handbags':
                Model = Handbags;
                break;
            case 'backpacks':
                Model = Backpacks;
                break;
            case 'wallets':
                Model = Wallets;
                break;
            case 'totes':
                Model = Totes;
                break;
            case 'clutches':
                Model = Clutches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category. Choose handbags, backpacks, wallets, totes, or clutches' 
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
            case 'handbags':
                Model = Handbags;
                break;
            case 'backpacks':
                Model = Backpacks;
                break;
            case 'wallets':
                Model = Wallets;
                break;
            case 'totes':
                Model = Totes;
                break;
            case 'clutches':
                Model = Clutches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category. Choose handbags, backpacks, wallets, totes, or clutches' 
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

// Optional: DELETE route to remove an item by ID
router.delete('/:category/:id', async (req, res) => {
    try {
        const { category, id } = req.params;

        // Select the appropriate model based on category
        let Model;
        switch(category.toLowerCase()) {
            case 'handbags':
                Model = Handbags;
                break;
            case 'backpacks':
                Model = Backpacks;
                break;
            case 'wallets':
                Model = Wallets;
                break;
            case 'totes':
                Model = Totes;
                break;
            case 'clutches':
                Model = Clutches;
                break;
            default:
                return res.status(400).json({ 
                    message: 'Invalid category' 
                });
        }

        // Find and delete the item
        const deletedItem = await Model.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ 
                message: 'Item not found' 
            });
        }

        res.status(200).json({
            message: `${category} item deleted successfully`,
            item: deletedItem
        });

    } catch (error) {
        console.error(`Error deleting ${req.params.category} item:`, error);
        res.status(500).json({ 
            message: 'Server error while deleting item', 
            error: error.message 
        });
    }
});

module.exports = router;