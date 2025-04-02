const express = require('express');
const { Sarees, Kurtis, Tops, Trousers } = require('../models/Women');
const router = express.Router();

// Generic route to handle different subcategories
router.get('/:subcategory', async (req, res) => {
    try {
        const { subcategory } = req.params;
        const { page = 1, limit = 10 } = req.query;

        // Map subcategories to their respective models
        const modelMap = {
            'sarees': Sarees,
            'kurtis': Kurtis,
            'tops': Tops,
            'trousers': Trousers
        };

        // Convert subcategory to lowercase for case-insensitive matching
        const normalizedSubcategory = subcategory.toLowerCase();

        // Check if the subcategory is valid
        if (!modelMap[normalizedSubcategory]) {
            return res.status(400).json({
                message: 'Invalid subcategory. Choose sarees, kurtis, tops, or trousers'
            });
        }

        // Select the appropriate model
        const Model = modelMap[normalizedSubcategory];

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
        console.error(`Error fetching ${req.params.subcategory} items:`, error);
        res.status(500).json({
            message: 'Server error while fetching items',
            error: error.message
        });
    }
});

// POST route to create a new item in a specific subcategory
router.post('/:subcategory', async (req, res) => {
    try {
        const { subcategory } = req.params;
        const { title, description, image } = req.body;

        // Map subcategories to their respective models
        const modelMap = {
            'sarees': Sarees,
            'kurtis': Kurtis,
            'tops': Tops,
            'trousers': Trousers
        };

        // Convert subcategory to lowercase for case-insensitive matching
        const normalizedSubcategory = subcategory.toLowerCase();

        // Validate required fields
        if (!title || !description || !image) {
            return res.status(400).json({
                message: 'Title, description, and image are required'
            });
        }

        // Check if the subcategory is valid
        if (!modelMap[normalizedSubcategory]) {
            return res.status(400).json({
                message: 'Invalid subcategory. Choose sarees, kurtis, tops, or trousers'
            });
        }

        // Select the appropriate model
        const Model = modelMap[normalizedSubcategory];

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
            message: `${subcategory} item created successfully`,
            item: savedItem
        });
    } catch (error) {
        console.error(`Error creating ${req.params.subcategory} item:`, error);
        res.status(500).json({
            message: 'Server error while creating item',
            error: error.message
        });
    }
});

// DELETE route to remove an item by ID
router.delete('/:subcategory/:id', async (req, res) => {
    try {
        const { subcategory, id } = req.params;

        // Map subcategories to their respective models
        const modelMap = {
            'sarees': Sarees,
            'kurtis': Kurtis,
            'tops': Tops,
            'trousers': Trousers
        };

        // Convert subcategory to lowercase for case-insensitive matching
        const normalizedSubcategory = subcategory.toLowerCase();

        // Check if the subcategory is valid
        if (!modelMap[normalizedSubcategory]) {
            return res.status(400).json({
                message: 'Invalid subcategory. Choose sarees, kurtis, tops, or trousers'
            });
        }

        // Select the appropriate model
        const Model = modelMap[normalizedSubcategory];

        // Find and delete the item
        const deletedItem = await Model.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.status(200).json({
            message: `${subcategory} item deleted successfully`,
            item: deletedItem
        });
    } catch (error) {
        console.error(`Error deleting ${req.params.subcategory} item:`, error);
        res.status(500).json({
            message: 'Server error while deleting item',
            error: error.message
        });
    }
});

module.exports = router;