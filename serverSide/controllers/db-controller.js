const express = require("express");
const mongoose = require("mongoose");
const Data = require("../model/Data");

module.exports.checkDB = function(req, res){
    Data.findOne({"shortURL": req.params.shortUrl}, (err, element)=>{
        if(err) res.status(404).send(err);
        if(element) res.status(200).send({ url: element });
      });
}