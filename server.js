const devTest = process.env.dev;
const envPort = process.env.port;

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const frameguard = require('frameguard');
const app = express();

//XSS
app.disable('x-powered-by');

const sslServer = () => {
    // Certificate
    const privateKey = fs.readFileSync('./SSL/private_key.key', 'utf8');
    const certificate = fs.readFileSync('./SSL/ssl_certificate.cer', 'utf8');
    const intermediateCertificate = fs.readFileSync('./SSL/ssl_intermediate_certificate.cer', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: intermediateCertificate
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

const httpServer = port => {
    // Starting http test server
    const httpExpressServer = http.createServer(app);
    httpExpressServer.listen(port, () => {
        console.log('HTTP server running on port: ' + port);
    });
};

//app

app.use("/assets", express.static('assets'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//force ssl if in production
if (!devTest && !envPort) app.use((req, res, next) => {
    if (req.connection.encrypted) return next();
    res.redirect(301, 'https://' + req.headers.host + req.url);
});

app.get("/", (req, res) => {
    res.render("index");
});


//check if started in dev mode
if (!devTest && !envPort) {
    sslServer();
} else {
    envPort ? httpServer(envPort) : httpServer(3000);
}
