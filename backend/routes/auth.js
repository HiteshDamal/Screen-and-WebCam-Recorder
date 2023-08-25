const express=require("express")
const router=express.Router();
const User= require('../models/User')
const { body, validationResult, matchedData } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')
const JWT_TOKEN="hiteshisagoodboy"


// created a user using POST "/auth"
router.post('/createUser', [body('name', 'Enter a valid Name').isLength({ min: 3 }),
body('password', 'Password must be atleast 8 character').isLength({ min: 1 }),
body('email').isEmail(),body('phone').isNumeric(),
],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //  create a new user
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(404).json({success,error: "sorry email id already existed" })
    }
    user = await User.create({
      name: req.body.name,
      password: secPass,
      // password:req.body.password,
      email: req.body.email,
      phone:req.body.phone,
    })
    // res.json(user)
    const data = {
      user: {
        id: user.id
      }
    }
    let success=true;
    const authToken = jwt.sign(data, JWT_TOKEN);

    res.json({success,authToken })

    // catch error
  } catch (error) {
    console.error(error.message)
    res.status(500).send(success,"Internal  some error has occured")
  }

})


// auth  the login
router.post('/login',
  [
    body('email', 'Enter a valid email-id').isEmail(),
    body('password', 'password cannot be blank').exists(),
  ], async (req, res) => {
   
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
    
      let user = await User.findOne({email })
      if (!user) {
       
        return res.status(400).json(success,"Please try to login with Correct Credentials")
      }
      const passCompare = await bcrypt.compare(password, user.password)
      if (!passCompare) {
        
        return res.status(400).json(success,"Please try to login with Correct Credentials")
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_TOKEN);
      let success=true;
      res.json({ success,authToken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal some error has occured")

    }
  })

  // user detail
  router.post('/getuser',fetchuser,async (req, res) => {
    let success=false;
      try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("password").select("name").select("email")
        res.send(user);
  
      } catch (error) {
        console.error(error.message)
        res.status(500).send(success,"Internal some error has occured")
        
      }
    })
module.exports =router