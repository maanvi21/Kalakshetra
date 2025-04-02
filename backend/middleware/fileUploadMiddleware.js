const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Then update your POST route:
router.post('/:category', upload.single('file'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = `/uploads/${req.file.filename}`; // Path to the uploaded file
        
        // Rest of your code...
    } catch (error) {
        // Error handling
    }
});