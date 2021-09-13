var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Comments = require('../models/comment');

/* GET users listing. */
router.get('/new', function (req, res, next) {
  res.render('userForm');
});
//save data;
router.post('/', (req, res, next) => {
  User.create(req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});
//list
router.get('/', (req, res) => {
  User.find({}, (err, data) => {
    if (err) return next(err);
    res.render('userList', { user: data });
  });
});
//details of single user
// router.get('/:id', (req, res) => {
//   var id = req.params.id;
//   User.findById(id, (err, data) => {
//     if (err) return next(err);
//     res.render('userDetail', { user: data });
//   });
// });

router.get('/:id', (req, res) => {
  var id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    Comments.find({ articleId: id }, (err, comments) => {
      res.render('userDetail', { user, comments });
    });
  });
});

// router.get('/:id', (req, res) => {
//   var id = req.params.id;
//   User.findById(id)
//     .populate('comments')
//     .exec((err, user) => {
//       if (err) return next(err);
//       console.log(user.comments);
//       res.render('userDetail', { user: user });
//     });
// });
//delete
router.get('/:id/delete', (req, res) => {
  var id = req.params.id;
  User.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err);
    Comments.deleteMany({ articleId: data._id }, (err, info) => {
      if (err) return next(err);
      res.redirect('/users');
    });
  });
});
//update
router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  User.findById(id, (err, data) => {
    console.log(data);
    if (err) return next(err);
    res.render('editForm', { user: data });
  });
});

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/users/' + id);
  });
});

router.post('/:id', (req, res) => {
  var id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/users/' + id);
  });
});

//comments
router.post('/:id/comment', (req, res, next) => {
  var id = req.params.id;
  console.log(req.params);
  req.body.articleId = id;
  Comments.create(req.body, (err, comment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, data) => {
        if (err) return next(err);
        res.redirect('/users/' + id);
      }
    );
  });
});

module.exports = router;
