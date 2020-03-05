//jshint esversion:6

//setup consts
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const app = express();

//app setup

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

//Setup database

mongoose.connect('mongodb://localhost:27017/content', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

//routes

app.route("/")
  .get(function(req, res) {
    res.render("index.ejs");
  });

//server start

app.listen(3000, function() {
  console.log("Server has started on port: 3000");
});
