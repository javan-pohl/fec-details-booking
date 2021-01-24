const express = require('express');
const path = require('path');
var cors = require('cors');
const config = require('../webpack.config.js');
const db = require('../database/getProps.js');

// auto-refresh html page -- more below
const livereload = require('livereload');

//middleware
const morgan = require('morgan');
const parser = require('body-parser');

const PORT = 3000;

const app = express();

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

const liveReloadServer = livereload.createServer();

// serve the client files (webpage)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/props/:propId', cors(), (req, res) => {
  console.log('GET request in process...');
  db.getById(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
