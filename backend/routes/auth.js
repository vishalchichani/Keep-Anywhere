const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Yeahthatsit";
const fetchuser = require('../middleware/fetchuser');


//Route 1 
router.post('/createUser', [
  body('name', 'Length should atleast be 3 letters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Passowrd should atleast be 5 characters long.').isLength({ min: 5 })
],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      //Checking if user already exists
      if (user) {
        return res.status(400).json({ error: "Sorry! This email is already registered." });
      }

      //Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword
      })
      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json(jwtData);

    } catch (error) {
      console.error(error.message);
      res.status(501).send("Unknown error occured.");
    }
  }
)

//Route 2
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password should atleast be 5 characters long.').isLength({ min: 5 })
],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const cmppass = await bcrypt.compare(password, user.password);

      if (!cmppass) {
        success = false;
        return res.status(400).json(success, { error: "Wrong Credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, jwtData });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unknown error occured.");
    }
  })

//Route 3

router.post('/getuser', fetchuser,
  async (req, res) => {

    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Unknown error occured.");
    }
  })

module.exports = router;