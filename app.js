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

mongoose.connect('mongodb://localhost:27017/contentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  caption: String,
  imgSrc: String
});

const Project = mongoose.model("project", projectSchema);

//routes

app.route("/")
  .get(function(req, res) {
    let projects = [];

    Project.find(function(err, results) {
      if (!err) {
        if (results || results != "") {
          projects = results;
        } else {
          console.log("No projects");
        }
      } else {
        console.log(err);
      }
      res.render("index.ejs", {
        projects: projects
      });
    });
  });

app.route("/blog")
  .get(function(req, res) {
    res.render("blog.ejs", {
      posts: posts
    });
  });

//404
app.get('*', function(req, res) {
  res.send('what???', 404);
});

//server start

app.listen(3000, function() {
  console.log("Server has started on port: 3000");
});
