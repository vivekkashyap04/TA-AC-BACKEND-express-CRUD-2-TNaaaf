var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, (err, userData) => {});
  
});

router.get('/new', (req, res) => {
  res.render('user');
});

router.post('/', (req, res, next) => {
  User.create(req.body, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
