require("dotenv").config();
const express = require("express");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const router = express.Router();

//     /api/users/registration - User registration
router.post("/registration", async (req, res) => {
  let { email } = req.body;
  if (email.length < 7 && !email.split("").includes("@"))
    return res.status(400).send("Not correct email");
  if (req.body.password.length < 6)
    return res.status(400).send("Password must be more thean 5 characters");
  //checking mail for use
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email exists");

  let hashedPass = await bcript.hash(req.body.password, process.env.SALT * 1);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  await user.save();
  res.send({ email: req.body.email, password: req.body.password });
});

//     /api/users/registration - User login
router.post("/login", async (req, res) => {
  //checking mail for use
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("No user with that email");
  const isTruePass = await bcript.compare(req.body.password, user.password);
  if (!isTruePass) return res.status(400).send("Password was wrong");
  const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET);
  process.env.authtoken = token;
  res.send({ id: user._id });
});

module.exports = router;
