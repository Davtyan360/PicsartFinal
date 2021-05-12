const express = require("express");
const router = express.Router();
const redis = require("redis");
const shortID = require("../shortId");

const client = redis.createClient();

const Data = require("../model/Data");
const User = require("../model/User");

client.on("connect", async () => {

  let count = await Data.countDocuments({});
  let limit = Math.ceil(0.2*count);

  await Data.find().sort({"count" : 1}).limit(limit).exec((err, users)=>{
    if (err) return;
    users.forEach((element) => {
      client.set(element.shortURL, element.longURL);
    });
  })
 
});

router.get("/:shortUrl", (req, res) => {
  client.get(req.params.shortUrl, (err, data) => {
    if(err) res.status(404).send(err);
    
    if(data) res.status(200).send({ url: data });

    Data.findOne({"shortURL": req.params.shortUrl}, (err, element)=>{
      if(err) res.status(404).send(err);
      if(element) res.status(200).send({ url: element });
    });
    
  });
});

router.post("/api/:id/longUrl", (req, res) => {
  let shortid = shortID.generate();
  let url = req.body.url || "https://www.drivereasy.com/";
  client.set(shortid, url);
  let newData = new Data({
    shortURL: shortid,
    longURL: url,
  });
  newData.save();
  updateUserDataID(req.params.id, newData._id);
  res.send({ shortUrl: shortid });
});

async function updateUserDataID(id, newID) {
  const user = await User.findOne({ _id: id });
  user.dataID.push(newID);
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        dataID: user.dataID,
      },
    }
  );
  return result;
}

module.exports = router;
