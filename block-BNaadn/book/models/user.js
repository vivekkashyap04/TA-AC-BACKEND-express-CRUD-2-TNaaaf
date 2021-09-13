const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  country: String,
  book: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('User', userSchema);
