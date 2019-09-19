const express = require('express');
const router = express.Router();
const seedFitbook = require('../models/seedFitbook.js');

const Posts = require('../models/posts.js')

//seed
router.get('/seed', (req, res) => {
  Posts.create(seedFitbook, (err, post) => {
    res.redirect('/')
  });
});

/* GET. */
router.get ('/', (req, res) => {
  Posts.find({}, (error, foundPosts) => {
    res.json(foundPosts)
  })
})

router.get ('/signin', (req, res) => {
  res.redirect('./signin.html')
})
//////// DELETE ROUTE ////////////
router.delete('/:id', (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (error, deletedPost) => {
    res.json(deletedPost)
  })
})

/////////// UPDATE ROUTE ////////////
router.put('/:id', (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedPost) => {
    res.json(updatedPost)
  })
})

////////// CREATE ROUTE ////////////
router.post('/', (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    res.json(createdPost)
  })
})


module.exports = router;
