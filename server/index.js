const express = require('express');
const path = require('path');
const config = require('../webpack.config.js');

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

app.get('/', (req, res) => {
  console.log('checking to see if this part runs');
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});