
const express = require('express');
const mongoose = require('mongoose')
const postsController = require('./controllers/posts.js');
const app = express();


const port = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://yulli:thisisapassword123@sei-lg8su.mongodb.net/fitbook?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose");
})

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/posts', postsController);

app.get('/signin', (req, res) => {
  res.redirect('signin.html')
})

app.get('/register', (req, res) => {
  res.redirect('register.html')
})
app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});

module.exports = app;
