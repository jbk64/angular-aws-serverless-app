var AWS = require('aws-sdk');

var dynamo = new AWS.DynamoDB();

exports.handler = async(event) => {
  console.log(event)
  const { username } = event.pathParameters
  const { bio } = JSON.parse(event.body)
  const params = {
    TableName: 'users',
    Item: {
      username: {
        "S": username
      },
      bio: {
        "S": bio
      }
    }
  }
  await dynamo.putItem(params).promise()
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  return response;
};
