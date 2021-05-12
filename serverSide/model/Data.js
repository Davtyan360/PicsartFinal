const mongoose = require("mongoose");

let dataSchema = mongoose.Schema({
  shortURL: {
    type: String,
    required: true,
  },
  longURL: {
    type: String,
    required: true,
  },
  author:{
    type: String,
    required:true,
  },
  count:{
    type: Number,
    required:true,
  }
});

module.exports = mongoose.model("Data", dataSchema);
