const express = require('express');
const path = require('path');
const config = require('../webpack.config.js');
const db = require('../database/getProps.js');

//middleware
const morgan = require('morgan');
const parser = require('body-parser');

//router
// const router = require('./routes.js');
// const mongoRouter = require('./mongoRoutes.js');

const PORT = 3000;

const app = express();

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

// set-up routes
// app.use('/api', router);
// app.use('/api', mongoRouter);

// serve the client files (webpage)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/props/:propId', (req, res) => {
  console.log('GET request in process...');
  // res.send('Hello from the server!');
  // db.getAll(req, res);
  db.getById(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});