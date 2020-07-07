const express = require("express");
const app = express();
const github = require("./util/githubProjects");
const port = process.env.PORT || 443;

app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    github.projects().then(projects => res.render("index", {githubProjects: projects}));    
});

app.listen(port, () => {
    console.log("server started");
    
});