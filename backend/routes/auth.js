const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

 
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
    if(user){
      return res.status(400).json({error: "Sorry! This email is already registered." });
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json("Done!"); 
    } catch(error) {
      console.error(error.message);
      res.status(501).send("Unknown error occured.");
    }  
}
)

module.exports = router;