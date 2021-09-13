var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, (err, userData) => {
    res.render('list', { users: userData });
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  User.findById(id, (err, userData) => {
    res.render('book', { user: userData });
  });
});
router.get('/new', (req, res) => {
  res.render('user');
});

router.post('/', (req, res, next) => {
  User.create(req.body, (err) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});

//book

router.post('/:id/books', (req, res, next) => {
  var id = req.params.id;
  req.body.userId = id;
  Book.create(req.body, (err, data) => {
    User.findByIdAndUpdate(id, { $push: { books: data._id } }, (err, data) => {
      if (err) return next(err);
      res.redirect('list');
    });
  });
});

module.exports = router;
