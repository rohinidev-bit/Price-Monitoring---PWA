// const functions=require('firebase-functions');
const express=require('express');
const puppeteer=require('puppeteer');

const app=express();
const http = require('http');
const bodyParser=require('body-parser');




// Server Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors Controls
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS'
  );
  next();
});
// app.use(cors());

const scraperRoutes = require('./routes/scrapperRoutes');
scraperRoutes(app);

const port = 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}, time: ${new Date()}`));

// exports .helloworld=functions.https.onRequest(app);