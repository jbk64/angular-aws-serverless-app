'use strict';

var AWS = require('aws-sdk');

var cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {

  const userSearchParams = {
    UserPoolId: 'eu-central-1_38CR8ssVT',
    AttributesToGet: [],
    Filter: '',
    Limit: 60
  }

  const search = event.queryStringParameters['search']
  if (search) {
    userSearchParams.Filter = `username ^= \"${search}\"`
  }

  cognito.listUsers(userSearchParams, function (err, data) {
    if (err === null) {
      var logins = [];
      data.Users.forEach(function (user) {
        logins.push(user.Username);
      });
      const response = {
        "statusCode": 200,
        "body": JSON.stringify(logins),
        "headers": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

        },
        "isBase64Encoded": false
      };
      callback(null, response);
    } else {
      callback(err);
    }
  });
};
