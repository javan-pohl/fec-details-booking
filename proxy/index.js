<<<<<<< HEAD
// const express = require('express');
// const morgan = require("morgan");
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');
// const cors = require('cors');

// // Create Express Server
// const app = express();

// // Configuration
// const PORT = 3000;
// const HOST = "localhost";
// const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// // database
// const db = require('../database/getProps.js');

// // Logging
// app.use(morgan('dev'));

// // serve the client files
// app.use(express.static(path.join(__dirname, '..', 'public')));

// // Info GET endpoint
// // app.get('/info', (req, res, next) => {
// //   res.send('This is a proxy service which proxies to Billing and Account APIs.');
// // });
// app.get('/api/props/:propId', cors(), (req, res) => {
//   db.getById(req, res);
// });

// // Authorization
// // app.use('', (req, res, next) => {
// //   if (req.headers.authorization) {
// //       next();
// //   } else {
// //       res.sendStatus(403);
// //   }
// // });

// // Proxy endpoints
// app.use('/json_placeholder', createProxyMiddleware({
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   pathRewrite: {
//       [`^/json_placeholder`]: '',
//   },
// }));

// // Start the Proxy
// app.listen(PORT, HOST, () => {
//   console.log(`Starting Proxy at ${HOST}:${PORT}`);
// });
=======
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// database
const db = require('../database/getProps.js');

// Logging
app.use(morgan('dev'));

// serve the client files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/props/:propId', cors(), (req, res) => {
  db.getById(req, res);
});

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/json_placeholder`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
>>>>>>> 30d0c5fa3397f86017c8ee344f24d304951ab9d2
