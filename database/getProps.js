const db = require('./index.js');
const Prop = require('./Prop.js');

module.exports = {
  getAll: function(req, res) {
    Prop.find({})
      .catch((err) => {
        console.log('err', err);
        res.status(404).send(err);
      })
      .then((results) => {
        console.log('success!');
        res.status(200).send(results);
      })
  },
  getById: function(req, res) {
    var int = parseInt(req.params.propId);
    Prop.find({propId: int})
      .catch((err) => {
        console.log('err', err);
        res.status(404).send(err);
      })
      .then((results) => {
        console.log('success!');         
        res.status(200).send(results);
      })
  }
}