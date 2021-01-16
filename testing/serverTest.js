const request = require('supertest');
const express = require('express');
// const db = require('../database/getProps.js');


console.log('in serverTest.js');

const app = express();

app.get('/api/:propId', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/api/7')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) {
      console.log('error...', err);
    } else {
      console.log('no error? ....', res.body);
    }
  });

// app.get('/test', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

// request(app)
//   .get('/test')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) {
//       console.log('error...', err);
//     } else {
//       console.log('no error? ....', res.body);
//     }
//   });