// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const github = require("./util/githubProjects");

const app = express();

//app

app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    github.projects().then(projects => res.render("index", { githubProjects: projects }));
});

const devTest = process.env.dev;

if (!devTest) {
    // Certificate
    const privateKey = fs.readFileSync('./SSL/private_key.key', 'utf8');
    const certificate = fs.readFileSync('./SSL/ssl_certificate.cer', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate
    };
    //force ssl
    app.use((req, res, next) => {
        if (req.connection.encrypted) return next();
        res.redirect(301, 'https://' + req.headers.host + req.url);
    });

    
    // Starting http server
    const httpServer = http.createServer(app);
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
} else {
    // Starting http test server
    const httpTestServer = http.createServer(app);
    const httpTestPort = 3000;
    httpTestServer.listen(httpTestPort, () => {
        console.log('HTTP test server running on port: ' + httpTestPort);
    });
}


