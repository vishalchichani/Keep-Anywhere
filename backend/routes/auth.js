const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

 
router.post('/',[
    body('name','Length should atleast be 3 letters').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Passowrd should atleast be 5 characters long.').isLength({ min: 5 })
    ], (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user));
    res.json({error: "Please enter a unique email"});  
}
)

module.exports = router;