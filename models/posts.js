const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: String,
  workout: String,
  intensity: Number,
  feel_good: Boolean,
  new_goal: String,
})

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;
