const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  summary: String,
  pages: Number,
  publication: String,
  cover_image: String,
  category: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Book', bookSchema);
