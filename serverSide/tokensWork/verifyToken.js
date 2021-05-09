const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = function (req, res, next) {
  const authcookie = process.env.authtoken;
  if (!authcookie) return res.status(401).send("You are not in account");
  try {
    jwt.verify(authcookie, process.env.JWT_SECRET, async (err, user) => {
      if (err) console.log(err);
      req.user = await User.findOne({ email: user.email });
      next();
    });
  } catch (err) {
    res.status(400).send("Token is wrong");
  }
};
