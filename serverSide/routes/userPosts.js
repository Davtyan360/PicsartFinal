const express = require("express");

const Data = require("../model/Data");
const User = require("../model/User");

const router = express.Router();

// /api/posts/get/last
router.get("/allPosts/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  let dataID = user.dataID;
  let arr = [];
  for (let i = 0; i < dataID.length; i++) {
    let z = await Data.findOne({ _id: dataID[i] });
    arr.push({ longUrl: z.longURL, shortUrl: z.shortURL });
  }
  res.send(arr);
});

module.exports = router;
