const redis = require("redis");
const client = redis.createClient();

//generating new shortID and checking in redis
module.exports.generate = function () {
  const id = Math.random().toString(36).substring(2, 9);

  client.exists(id, (err, val) => {
    if (err) throw err;
    if (val != 0) return this.generate();
  });
  
  return id;
};
