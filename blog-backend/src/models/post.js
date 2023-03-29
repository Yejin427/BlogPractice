const mongoose = require('mongoose');

const {Schema} = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: new Date()
  }
});

const Author = new Schema({
  name: String,
  email: String
});

const Book = new Schema({
  title: String,
  description: String,
  authors: [Author],
  meta: {
    likes: Number
  },
  extra: Schema.Types.Mixed
});

module.exports = mongoose.model('Post', Post);