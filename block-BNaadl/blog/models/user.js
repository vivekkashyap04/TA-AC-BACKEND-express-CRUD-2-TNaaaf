const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
