const express = require('express');
const router = express.Router();
const Comments = require('../models/comment');
const User = require('../models/user');

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Comments.findById(id, (err, comment) => {
    res.render('commentEdit', { comment: comment });
  });
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comments.findByIdAndUpdate(id, req.body, (err, data) => {
    if (err) return next(err);
    res.redirect('/users/' + data.articleId);
  });
});
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Comments.findByIdAndRemove(id, (err, comment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      comment.articleId,
      { $pull: { comments: comment._id } },
      (err, data) => {
        if (err) return next(err);
        res.redirect('/users/' + comment.articleId);
      }
    );
  });
});

// Likes
router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;

  Comments.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/users/' + comment.articleId);
  });
});
// // DisLikes
// router.get('/:id/dislike', (req, res, next) => {
//   let id = req.params.id;

//   Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, comment) => {
//     if (err) return next(err);
//     res.redirect('/users/' + comment.articleId);
//   });
// });

module.exports = router;
