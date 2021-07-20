// $ mongod --dbpath=/data --port 27017
// or just $ mongod

const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/props';

const db = mongoose.connect(mongoUri, { useMongoClient: true });

db.on('error', console.error.bind(console, 'db mongoose connection error: '));

module.exports = db;
