// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const github = require("./util/githubProjects");

// Certificate
const privateKey = fs.readFileSync('./SSL/private_key.key', 'utf8');
const certificate = fs.readFileSync('./SSL/ssl_certificate.cer', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate
};

//app

app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    github.projects().then(projects => res.render("index", {githubProjects: projects}));    
});

// app.listen(port, () => {
//     console.log("server started");
    
// });

// Starting https server
const httpsServer = https.createServer(credentials, app);
const port = 443;
httpsServer.listen(port, () => {
	console.log('HTTPS Server running');
});


