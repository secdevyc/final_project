
const express = require('express');
const mongoose = require('mongoose')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

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

const poolData = {
UserPoolId : "WpZcEmeUC",
ClientId: "5g5oahal14ekphr0mrc2274lks"
};

const pool_region = 'us-east-1';

// function RegisterUser(){
//     var attributeList = [];
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"sampleEmail@gmail.com"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));
//
//     userPool.signUp('sampleEmail@gmail.com', 'SamplePassword123', attributeList, null, function(err, result){
//         if (err) {
//             console.log(err);
//             return;
//         }
//         cognitoUser = result.user;
//         console.log('user name is ' + cognitoUser.getUsername());
//     });
// }
//
// function Login() {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username : 'sampleEmail@gmail.com',
//         Password : 'SamplePassword123',
//     });
//
//     var userData = {
//         Username : 'sampleEmail@gmail.com',
//         Pool : userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             console.log('access token + ' + result.getAccessToken().getJwtToken());
//             console.log('id token + ' + result.getIdToken().getJwtToken());
//             console.log('refresh token + ' + result.getRefreshToken().getToken());
//         },
//         onFailure: function(err) {
//             console.log(err);
//         },
//
//     });
// }
//
// function update(username, password){
//         var attributeList = [];
//         attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//             Name: "custom:scope",
//             Value: "some new value"
//         }));
//         attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//             Name: "name",
//             Value: "some new value"
//         }));
//
//         var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//             Username: username,
//             Password: password,
//         });
//
//         var userData = {
//             Username: username,
//             Pool: userPool
//         };
//         var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//
//         cognitoUser.updateAttributes(attributeList, (err, result) => {
//             if (err) {
//                 //handle error
//             } else {
//                 console.log(result);
//             }
//         });
// }
//
// function ValidateToken(token) {
//         request({
//             url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
//             json: true
//         }, function (error, response, body) {
//             if (!error && response.statusCode === 200) {
//                 pems = {};
//                 var keys = body['keys'];
//                 for(var i = 0; i < keys.length; i++) {
//                     //Convert each key to PEM
//                     var key_id = keys[i].kid;
//                     var modulus = keys[i].n;
//                     var exponent = keys[i].e;
//                     var key_type = keys[i].kty;
//                     var jwk = { kty: key_type, n: modulus, e: exponent};
//                     var pem = jwkToPem(jwk);
//                     pems[key_id] = pem;
//                 }
//                 //validate the token
//                 var decodedJwt = jwt.decode(token, {complete: true});
//                 if (!decodedJwt) {
//                     console.log("Not a valid JWT token");
//                     return;
//                 }
//
//                 var kid = decodedJwt.header.kid;
//                 var pem = pems[kid];
//                 if (!pem) {
//                     console.log('Invalid token');
//                     return;
//                 }
//
//                 jwt.verify(token, pem, function(err, payload) {
//                     if(err) {
//                         console.log("Invalid Token.");
//                     } else {
//                         console.log("Valid Token.");
//                         console.log(payload);
//                     }
//                 });
//             } else {
//                 console.log("Error! Unable to download JWKs");
//             }
//         });
// }
//
// function renew() {
//     const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: "your_refresh_token_from_a_previous_login"});
//
//     const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//
//     const userData = {
//         Username: "sample@gmail.com",
//         Pool: userPool
//     };
//
//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//
//     cognitoUser.refreshSession(RefreshToken, (err, session) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let retObj = {
//                 "access_token": session.accessToken.jwtToken,
//                 "id_token": session.idToken.jwtToken,
//                 "refresh_token": session.refreshToken.token,
//             }
//             console.log(retObj);
//         }
//     })
// }

app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});

module.exports = app;
