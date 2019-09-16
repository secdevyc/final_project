const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const Posts = require('../models/posts.js')

/* GET. */
router.get ('/', (req, res) => {
  Posts.find({}, (error, foundPosts) => {
    res.json(foundPosts)
  })
})

////////// CREATE ROUTE ////////////
router.post('/', (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    res.json(createdPost)
  })
})


module.exports = router;
