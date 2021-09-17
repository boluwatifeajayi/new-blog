const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//register 
router.post('/register', async (req, res) => {
  try{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
     const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashedPass,
     })
     
     const user = await newUser.save();
     res.status(200).json(user);

  } catch(err){
      res.status(500).json(err);
  }
})

//login
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({email: req.body.email})
    !user && res.status(400).json("wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json("wrong credentials");

    const {password, ...others} = user._doc;
    res.status(200).json(others);
  }catch(err){
    res.sendStatus(500).json(err);
  }
})

module.exports = router;