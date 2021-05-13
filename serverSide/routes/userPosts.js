const express = require("express");

const Data = require("../model/Data");
const User = require("../model/User");

const router = express.Router();


router.get("/allPosts/:id/count", async (req, res) => {
  const { page1, limit1 } = req.query;

  let user = await User.findById(req.params.id);
  let dataID = user.dataID;
  let arr = [];
  let max =
    page1 * 10 + limit1 > dataID.length
      ? dataID.length - page1*10
      : page1 * 10;
  for (let i = max; i < max + Number(limit1); i++) {
    let z = await Data.findOne({ _id: dataID[i] });
    arr.unshift({ longUrl: z.longURL, shortUrl: z.shortURL });
  }
  res.send({
    count: dataID.length,
    arr: arr,
  });
});
module.exports = router;
