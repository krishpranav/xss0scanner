const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const queryString = require('query-string');
const puppeteer = require('puppeteer');

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.sendfile(__dirname + '/public/scanner.html');
});

app.get('/scanner', async (req, res) => {
    let globalURL = req.query.url;
    console.log('GET REQUEST');
    let hasXSS = await check_xss(globalURL);
    res.send(hasXSS);
});
