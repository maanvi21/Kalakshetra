const express= require('express');
const User= require('../models/User');
const router= express.Router();
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    let user= await User.findOne({email});
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if(user){
        return res.status(400).json({ error: "User already exists" });
    }
    else
    {
        user= new User({
            
            email,
            password: hashedPassword, // Store the hashed password
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully" });
    }
   
  } catch(error){
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server error" });
}});

module.exports=router;