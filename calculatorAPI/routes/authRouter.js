const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  
  //Checking if the user is in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(200).send({message: "Email doesn't exist", error: true});

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(200).send({message: "Invalid Password",err: true});

  //assign a token
  const token = jwt.sign({ _id: user._id }, "qwertyasdfghzxcvbn");
  res.header("auth-token", token); 

  res.status(200).send({authToken: token});
});

module.exports = router;
