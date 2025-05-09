import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});

export default router;
