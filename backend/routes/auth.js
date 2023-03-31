const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = "Yeahthatsit"; 

router.post('/createUser',[
    body('name','Length should atleast be 3 letters').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Passowrd should atleast be 5 characters long.').isLength({ min: 5 })
    ],
    async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    try{
    let user = await User.findOne({email: req.body.email});

    //Checking if user already exists
    if(user){
      return res.status(400).json({error: "Sorry! This email is already registered." });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const secpassword= await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword
      })
    const data = {
      user:{
        id: user.id
      }
    }

    const jwtData = jwt.sign(data, JWT_SECRET);   
    res.json(jwtData); 
    
    } catch(error) {
      console.error(error.message);
      res.status(501).send("Unknown error occured.");
    }  
}
)

module.exports = router;