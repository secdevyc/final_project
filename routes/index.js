const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({
  "region": "us-east-1",
  "accessKeyId": "AKIAWOMUXDIE77LUONI5",
  "secretAccessKey": "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"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "Posts";

/* GET home page. */
router.get ('/', (req, res) => {
  res.render('index.html')
})
// router.get('/fetch', (req, res) => {
//   let post = {
//     TableName: table,
//   };
//
//   docClient.get(post, function (err, data) {
//       if (err) {
//           console.log(err);
//           handleError(err, res);
//       } else {
//           handleSuccess(data.Item, res);
//       }
//    });
//
//   function handleError(err, res) {
//       res.json({ 'message': 'server side error', statusCode: 500, error:
//       err });
//   }
//
//   function handleSuccess(data, res) {
//       res.json({ message: 'success', statusCode: 200, data: data })
//   }
// })


module.exports = router;
