const mongoose = require('mongoose');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const postSchema = new mongoose.Schema({
  name: { type: String, require: true },
  title: String,
  image: String,
  workout: String,
  intensity: Number,
  feel_good: Boolean,
  new_goal: String,
})

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;
