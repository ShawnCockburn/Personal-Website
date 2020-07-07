// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const github = require("./util/githubProjects");

const app = express();

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

//force ssl
app.get('*',(req,res,next) => {
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect('https://www.shawncockburn.co.uk'+req.url)
    else
      next();
  })

app.get("/", (req, res) => {
    github.projects().then(projects => res.render("index", {githubProjects: projects}));    
});

// app.listen(port, () => {
//     console.log("server started");
    
// });

// Starting http server
const httpServer = https.createServer(app);
const httpport = 80;
httpServer.listen(httpport, () => {
	console.log('HTTP Server running');
});

// Starting https server
const httpsServer = https.createServer(credentials, app);
const httpsport = 443;
httpsServer.listen(httpsport, () => {
	console.log('HTTPS Server running');
});


