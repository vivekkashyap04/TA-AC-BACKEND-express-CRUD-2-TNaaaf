var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
var Book = require('../models/book');

router.get('/name', (req, res, next) => {
  var name = req.params.name;
  Book.find({ name: name }, (err, data) => {
    if (err) return next(err);
    console.log(data);
  });
});

module.exports = router;
