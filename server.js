const devTest = process.env.dev;

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const github = require("./util/githubProjects");
const frameguard = require('frameguard');
const app = express();

//XSS
app.disable('x-powered-by');

const sslServer = () => {
    // Certificate
    const privateKey = fs.readFileSync('./SSL/private_key.key', 'utf8');
    const certificate = fs.readFileSync('./SSL/ssl_certificate.cer', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate
    };

    //prevent click jacking
    app.use(frameguard({ action: 'SAMEORIGIN' }))

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
};

const testServer = () => {
    // Starting http test server
    const httpTestServer = http.createServer(app);
    const httpTestPort = 3000;
    httpTestServer.listen(httpTestPort, () => {
        console.log('HTTP test server running on port: ' + httpTestPort);
    });
};

//app

app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//force ssl if in preduction
if (!devTest) app.use((req, res, next) => {
    if (req.connection.encrypted) return next();
    res.redirect(301, 'https://' + req.headers.host + req.url);
});

app.get("/", (req, res) => {
    github.projects().then(projects => res.render("index", { githubProjects: projects }));
});


//check if started in dev mode
if (!devTest) {
    sslServer();
} else {
    testServer();
}


